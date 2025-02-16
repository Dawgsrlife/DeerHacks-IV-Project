import React, { useState, useEffect } from "react";
import Card from "components/card";
import Dropdown from "components/dropdown";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import moment from "moment";

const Timeline = () => {
    const [memories, setMemories] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/timeline");
                const data = await response.json();

                if (!data.memories) throw new Error("No memories found");

                // Adjust image paths to match backend route
                const formattedMemories = data.memories.map(memory => ({
                    ...memory,
                    image_path: `http://127.0.0.1:5000/${memory.image_path}`
                }));

                setMemories(formattedMemories);
            } catch (err) {
                setError("Failed to fetch timeline data");
            } finally {
                setLoading(false);
            }
        };

        fetchMemories();
    }, []);

    const sortedMemories = [...memories].sort((a, b) => {
        return sortOrder === "desc"
            ? new Date(b.date_added) - new Date(a.date_added)
            : new Date(a.date_added) - new Date(b.date_added);
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-navy-700 dark:text-white">Timeline</h2>
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

            {loading ? (
                <p className="text-gray-600 dark:text-gray-300">Loading timeline...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="relative border-l-4 border-blue-500 pl-4 space-y-8">
                    {sortedMemories.map((memory, index) => (
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
            )}
        </div>
    );
};

export default Timeline;
