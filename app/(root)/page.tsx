"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input";
import TaskList from "@/components/TaskList";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [tasks, setTasks] = useState<{ id: number; value: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) router.push("/api/auth/signin");
      
      const tasksFromDB = await getTasks();
      const cleanTasks = tasksFromDB.map((task: {title: string}, index: number) => ({
        id: index,
        value: task.title,
      }));

      setTasks(cleanTasks);
    })();
  }, []);

  const saveTasks = async () => {
    const session = await getSession();
    
    if (session?.user?.email) {
      const response = await fetch("/api/save-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: session.user.email, tasks }),
      });

      if (response.ok) {
        console.log("Tasks saved successfully!");
      } else {
        console.log("Failed to save tasks.");
      }
    } else {
      console.log("No session found or email missing.");
    }
  };

  const getTasks = async () => {
    const session = await getSession();

    if (session?.user?.email) {
      const email = session.user.email;
      const response = await fetch(`/api/save-tasks?email=${email}`);

      if (!response.ok) {
        console.log("Failed to retrieve tasks.");
        return [];
      }

      const data = await response.json();
      return data.tasks;
    }
  }

 
  const addTask = (newTask: string) => {
    const newTaskObject = { id: tasks.length, value: newTask };
    setTasks([newTaskObject, ...tasks]);
  };

  const updateTask = (updatedTask: { id: number; value: string }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, value: updatedTask.value } : task
      )
    );
  };

  const deleteTask = (id: number) => {
      const updatedTask = [...tasks];
      updatedTask.splice((tasks.length - id - 1), 1);
      setTasks(updatedTask);
  }
  
  return (
    <>
      <div className="sm:h-10 h-auto w-[90%] m-auto sm:mb-10 mb-5 sm:text-center flex items-center justify-between">
        <p className=" sm:text-3xl font-bold font-sans text-xl grow border-black border-b-2">
          TODO LIST
        </p>
        <div className=" sm:right-0 flex-none">
          <button 
            onClick={async () => await signOut({ redirect: true })}
            className="bg-black hover:bg-gray-600 text-gray-100 px-5 py-1 mx-2 sm:text-base text-sm rounded"
          >
            Log Out
          </button>
          <button 
              onClick={saveTasks}
              className="bg-green-500 hover:bg-green-600 text-gray-100 px-5 py-1 sm:text-base text-sm rounded"
            >
              Save
          </button>
        </div>
      </div>
      <Input sendDataToParent={addTask} />
      <TaskList tasks={tasks} sendDataToPage={updateTask} deleteTask={deleteTask} />
      {tasks.length > 0 &&
          <button
            onClick={() => setTasks([])}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
      }
      
    </>
  );
};

export default Page;
