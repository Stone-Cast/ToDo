"use client";

import React from "react";
import Task from "@/components/Task";

const TaskList = ({
  tasks,
  sendDataToPage,
  deleteTask,
}: {
  tasks: { id: number; value: string }[];
  sendDataToPage: (data: { id: number; value: string }) => void;
  deleteTask: (id: number) => void;
}) => {
  return (
    <div className="mt-5 shadow-lg space-y-4">
      {tasks.map((task) => (
        <Task
          key={task.id}
          value={task.value}
          id={task.id}
          sendDataToTaskList={sendDataToPage}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
