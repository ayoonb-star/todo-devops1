"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Finish assignment", completed: false },
    { id: 2, title: "Study Next.js", completed: false },
    { id: 3, title: "Setup Git repository", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
      },
    ]);

    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 px-5 py-16 text-gray-800">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          TODO APPLICATION
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Organize your tasks and stay productive.
        </p>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter a task..."
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={addTask}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 accent-blue-600"
                />

                <span
                  className={
                    task.completed
                      ? "break-words text-gray-400 line-through"
                      : "break-words"
                  }
                >
                  {task.title}
                </span>
              </label>

              <button
                onClick={() => deleteTask(task.id)}
                className="shrink-0 font-medium text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="py-8 text-center text-gray-400">
            No tasks yet. Add your first task!
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          {tasks.filter((task) => task.completed).length} of {tasks.length} tasks completed
        </p>
      </div>
    </main>
  );
}