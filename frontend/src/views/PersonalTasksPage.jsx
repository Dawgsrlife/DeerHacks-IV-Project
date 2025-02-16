import React, { useState, useEffect } from "react";
import Card from "components/card";
import { MdCheckCircle, MdDelete, MdAdd } from "react-icons/md";

const PersonalTasksPage = () => {
    const [tasks, setTasks] = useState(() => {
        // Load tasks from localStorage if available
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    // Save tasks to localStorage when updated
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Add a new task
    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    // Toggle task completion
    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Remove a task
    const removeTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                Personal Tasks
            </h2>

            {/* Task Input */}
            <div className="flex w-full max-w-xl items-center gap-2 mt-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 dark:bg-navy-800 dark:text-white focus:outline-none"
                />
                <button
                    onClick={handleAddTask}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <MdAdd className="w-5 h-5" />
                </button>
            </div>

            {/* Task List */}
            <div className="mt-6 w-full max-w-xl space-y-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-white rounded-xl shadow-md dark:bg-navy-700"
                        >
                            <div
                                className={`flex items-center gap-3 ${
                                    task.completed ? "opacity-50 line-through" : ""
                                }`}
                            >
                                <button onClick={() => toggleTaskCompletion(task.id)}>
                                    <MdCheckCircle
                                        className={`h-6 w-6 ${
                                            task.completed ? "text-green-500" : "text-gray-400"
                                        }`}
                                    />
                                </button>
                                <p className="text-base text-navy-700 dark:text-white">
                                    {task.text}
                                </p>
                            </div>
                            <button onClick={() => removeTask(task.id)}>
                                <MdDelete className="h-6 w-6 text-red-500 hover:text-red-700" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        No tasks yet. Start by adding one above!
                    </p>
                )}
            </div>
        </div>
    );
};

export default PersonalTasksPage;
