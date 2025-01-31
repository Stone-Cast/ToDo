"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import TaskList from "@/components/TaskList";

const Page = () => {
  const [tasks, setTasks] = useState<{ id: number; value: string }[]>([]);

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
      <div className="sm:h-10 h-auto w-[90%] m-auto sm:mb-10 mb-5 sm:text-center border-black border-b-2">
        <span className="sm:text-3xl font-bold font-sans text-base">
          TODO LIST
        </span>
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
