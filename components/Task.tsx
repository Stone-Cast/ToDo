"use client";

import React, { useState } from "react";

const Task = ({
  value,
  id,
  sendDataToTaskList,
  deleteTask,
}: {
  value: string;
  id: number;
  sendDataToTaskList: (data: { id: number; value: string }) => void;
  deleteTask: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    	if (inputValue.trim() != "") {
      		sendDataToTaskList({ id, value: inputValue });
      		setIsEditing(false);
    	}
    }
  };

  return (
    <div
      className={`relative group p-4 bg-gray-100 w-full text-lg rounded-lg border-b shadow-sm hover:bg-gray-200 transition`}
    >
      {isEditing ? (
        <input
          className="p-2 bg-gray-100 w-full text-lg rounded-lg border border-gray-500 shadow-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <>
          <span className="block">{value}</span>
          <button
            className="absolute hidden group-hover:block right-16 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black text-white rounded hover:bg-gray-600 shadow-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="absolute hidden group-hover:block right-4 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black text-white rounded hover:bg-gray-600 shadow-sm"
            onClick={() => deleteTask(id)}
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
