import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Card from "components/card";
import axios from "axios";

const sampleMemories = [
    {
        image_path: "images/beach.png",
        description: "Trip to the beach with family.",
        summary: "A relaxing family trip to the beach on a sunny day.",
        tags: ["vacation", "beach", "family"],
    },
    {
        image_path: "images/dog.jpg",
        description: "Playing with my dog in the park.",
        summary: "Spent the afternoon playing fetch with my dog.",
        tags: ["pets", "dog", "park"],
    },
    {
        image_path: "images/food_pizza.jpg",
        description: "Had the best pizza ever!",
        summary: "Tried a new pizza place, and it was delicious.",
        tags: ["food", "pizza", "dinner"],
    },
    {
        image_path: "images/notebook.jpg",
        description: "Math notes from college.",
        summary: "Studying calculus for an upcoming test.",
        tags: ["study", "notes", "math"],
    },
    {
        image_path: "images/sunset.jpg",
        description: "Beautiful sunset at the mountains.",
        summary: "Captured an amazing sunset view while hiking.",
        tags: ["nature", "sunset", "travel"],
    }
];

const MemoryPage = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [memoryData, setMemoryData] = useState({ images: [], summaries: [], tags: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemory = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:5000/search?desc=${encodeURIComponent(query)}`);
                if (!response.data || response.data.images.length === 0) {
                    setMemoryData({ images: [], summaries: [], tags: [] });
                } else {
                    setMemoryData({
                        images: response.data.images,
                        summaries: response.data.summaries || [],
                        tags: response.data.tags || []
                    });
                }
            } catch (error) {
                console.error("Error fetching memory:", error);
                setMemoryData({ images: [], summaries: [], tags: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchMemory();
    }, [query, location.key]);

    // If API doesn't return results, use sample memories
    const displayMemories = memoryData.images.length > 0 ? memoryData.images.map((imgPath, index) => ({
        image_path: imgPath,
        description: `Memory ${index + 1}`,
        summary: memoryData.summaries[index] || "No summary available.",
        tags: memoryData.tags || []
    })) : sampleMemories;

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

            {/* Memory Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {displayMemories.map((memory, index) => (
                    <Card key={index} extra="p-4">
                        <img
                            src={`http://127.0.0.1:5000/${memory.image_path}`}
                            alt={memory.description}
                            className="w-full rounded-lg shadow-md"
                        />
                        <h3 className="mt-2 text-lg font-semibold text-navy-700 dark:text-white">{memory.description}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{memory.summary}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {memory.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MemoryPage;
