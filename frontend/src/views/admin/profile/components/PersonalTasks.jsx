import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdDelete, MdAdd } from "react-icons/md";
import Card from "components/card";

const PersonalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

  // Function to determine greeting and quote
  useEffect(() => {
    const hour = new Date().getHours();
    let userName = "You"; // You can make this dynamic later

    if (hour < 12) {
      setGreeting(`Good Morning, ${userName}!`);
      setQuote("Rise and shine! A new day brings new opportunities.");
    } else if (hour < 18) {
      setGreeting(`Good Afternoon, ${userName}!`);
      setQuote("Keep pushing forward, success is within reach.");
    } else {
      setGreeting(`Good Night, ${userName}!`);
      setQuote("You can make magic happen.");
    }
  }, []);

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
      <Card extra={"w-full p-4 h-full"}>
        {/* Personalized Greeting */}
        <div className="mb-4">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            {greeting}
          </h4>
          <p className="mt-1 text-lg text-gray-600">{quote}</p>
        </div>

        {/* Task Input */}
        <div className="flex items-center gap-2 mb-4">
          <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What do you want to accomplish today?"
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-white/10 dark:bg-navy-800 dark:text-white focus:outline-none"
          />
          <button
              onClick={handleAddTask}
              className="flex items-center justify-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <MdAdd className="w-5 h-5" />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length > 0 ? (
              tasks.map((task) => (
                  <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-white rounded-2xl shadow-md dark:bg-navy-700"
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
      </Card>
  );
};

export default PersonalTasks;
