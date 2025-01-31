"use client";

import React, { useState } from "react";

const Input = ({ sendDataToParent }: { sendDataToParent: (data: string) => void }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return;
    sendDataToParent(task);
    setTask("");
  };

  return (
    <form
      className="flex flex-row items-center justify-center w-full"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Add item..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full sm:px-4 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none transition focus:shadow-lg"
      />
      <button
        type="submit"
        className="bg-black hover:bg-gray-600 text-gray-100 px-5 py-1 mx-2 sm:text-2xl text-base rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default Input;
