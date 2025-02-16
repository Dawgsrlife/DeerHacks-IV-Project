import React, { useState, useEffect } from "react";
import Card from "components/card";
import Dropdown from "components/dropdown";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import moment from "moment";

const Timeline = () => {
    const [memories, setMemories] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        // Load images directly from backend directory
        const fetchedMemories = [
            {
                image_path: "http://127.0.0.1:5000/images/beach.png",
                description: "Trip to the beach with family.",
                tags: ["vacation", "beach", "family"],
                date_added: "2023-07-15"
            },
            {
                image_path: "/backend/images/dog.jpg",
                description: "Playing with my dog in the park.",
                tags: ["pets", "dog", "park"],
                date_added: "2023-08-10"
            },
            {
                image_path: "/backend/images/food_pizza.jpg",
                description: "Had the best pizza ever!",
                tags: ["food", "pizza", "dinner"],
                date_added: "2023-06-05"
            },
            {
                image_path: "/backend/images/notebook.png",
                description: "Math notes from college.",
                tags: ["study", "notes", "math"],
                date_added: "2022-09-20"
            },
            {
                image_path: "/backend/images/sunset.jpg",
                description: "Beautiful sunset at the mountains.",
                tags: ["nature", "sunset", "travel"],
                date_added: "2023-05-30"
            }
        ];

        // Sort memories by date
        const sortedMemories = fetchedMemories.sort((a, b) => {
            return sortOrder === "desc"
                ? new Date(b.date_added) - new Date(a.date_added)
                : new Date(a.date_added) - new Date(b.date_added);
        });
        setMemories(sortedMemories);
    }, [sortOrder]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-navy-700 dark:text-white">Timeline</h2>
                {/* Sorting Dropdown */}
                <Dropdown
                    button={
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                            {sortOrder === "desc" ? <FaSortAmountDown className="mr-2" /> : <FaSortAmountUp className="mr-2" />}
                            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                        </button>
                    }
                    children={
                        <div className="p-2 bg-white shadow-lg rounded-lg dark:bg-gray-800">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setSortOrder("desc")}>
                                Newest First
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setSortOrder("asc")}>
                                Oldest First
                            </button>
                        </div>
                    }
                />
            </div>

            <div className="relative border-l-4 border-blue-500 pl-4 space-y-8">
                {memories.map((memory, index) => (
                    <div key={index} className="relative flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <div className="absolute -left-5 w-14 h-14 bg-blue-500 text-white rounded-full flex flex-col items-center justify-center font-bold text-sm shadow-md">
                            <span className="text-lg">{moment(memory.date_added).format("DD")}</span>
                            <span className="text-xs">{moment(memory.date_added).format("MMM")}</span>
                        </div>
                        <img
                            src={memory.image_path}
                            alt={memory.description}
                            className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-700"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-navy-700 dark:text-white">{memory.description}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{moment(memory.date_added).format("MMMM DD, YYYY")}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {memory.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
