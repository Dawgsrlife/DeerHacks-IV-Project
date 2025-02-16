import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";

const TimelinePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/timeline");
                setEvents(response.data.events || []);
            } catch (error) {
                console.error("Error fetching timeline:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimeline();
    }, []);

    return (
        <div className="flex flex-col items-center p-6">
            {/* Back Button */}
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <MdArrowBack className="w-5 h-5" />
                <span>Back</span>
            </button>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-bold text-navy-700 dark:text-white">
                Your Timeline
            </h2>

            {/* Loading State */}
            {loading && <p className="mt-4 text-gray-600">Loading timeline...</p>}

            {/* No Events Found */}
            {!loading && events.length === 0 && (
                <p className="mt-4 text-red-500">No events found in your timeline.</p>
            )}

            {/* Timeline Display */}
            <div className="mt-6 w-full max-w-3xl">
                {events.map((event, index) => (
                    <div key={index} className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-navy-700 dark:text-white">{event.date}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelinePage;
