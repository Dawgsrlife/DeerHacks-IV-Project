import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdDelete, MdAdd } from "react-icons/md";
import Card from "components/card";

const PersonalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    let userName = "You";

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

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
        tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
      <Card extra={"w-full p-6 h-full flex flex-col space-y-4"}>
        <div className="mb-4 text-center">
          <h4 className="text-3xl font-bold text-navy-700 dark:text-white">
            {greeting}
          </h4>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">{quote}</p>
        </div>

        <div className="flex items-center gap-4 w-full">
          <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What do you want to accomplish today?"
              className="flex-grow px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-white/10 dark:bg-navy-800 dark:text-white focus:outline-none"
          />
          <button
              onClick={handleAddTask}
              className="flex items-center justify-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <MdAdd className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
              tasks.map((task) => (
                  <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md dark:bg-navy-700 w-full"
                  >
                    <div
                        className={`flex items-center gap-3 ${task.completed ? "opacity-50 line-through" : ""}`}
                    >
                      <button onClick={() => toggleTaskCompletion(task.id)}>
                        <MdCheckCircle
                            className={`h-6 w-6 ${task.completed ? "text-green-500" : "text-gray-400"}`}
                        />
                      </button>
                      <p className="text-lg text-navy-700 dark:text-white">
                        {task.text}
                      </p>
                    </div>
                    <button onClick={() => removeTask(task.id)}>
                      <MdDelete className="h-6 w-6 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
              ))
          ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
                No tasks yet. Start by adding one above!
              </p>
          )}
        </div>
      </Card>
  );
};

export default PersonalTasks;
