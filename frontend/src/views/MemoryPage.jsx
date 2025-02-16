import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Card from "components/card";

const MemoryPage = () => {
    const { query } = useParams(); // Get the search query from URL
    const navigate = useNavigate();
    const [memoryData, setMemoryData] = useState({ images: [], tags: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemory = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/search?desc=${query}`);
                if (!response.ok) throw new Error("Memory not found");

                const data = await response.json();
                setMemoryData({ images: data.images || [], tags: data.tags || [] });
            } catch (error) {
                console.error("Error fetching memory:", error);
                setMemoryData({ images: [], tags: [] }); // No results found
            } finally {
                setLoading(false);
            }
        };

        fetchMemory();
    }, [query]);

    return (
        <div className="flex flex-col items-center p-6">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <MdArrowBack className="w-5 h-5" />
                <span>Back</span>
            </button>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-bold text-navy-700 dark:text-white">
                Search Results for: "{query}"
            </h2>

            {/* Loading State */}
            {loading && <p className="mt-4 text-gray-600">Loading memory...</p>}

            {/* No Results Found */}
            {!loading && memoryData.images.length === 0 && (
                <p className="mt-4 text-red-500">No related memory found.</p>
            )}

            {/* Memory Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {memoryData.images.map((imgPath, index) => (
                    <Card key={index} extra="p-4">
                        <img
                            src={`http://127.0.0.1:5000/${imgPath}`} // Backend should serve images
                            alt={`Memory ${index}`}
                            className="w-full rounded-lg shadow-md"
                        />
                    </Card>
                ))}
            </div>

            {/* Tags Display */}
            {memoryData.tags.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Tags:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {memoryData.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryPage;
