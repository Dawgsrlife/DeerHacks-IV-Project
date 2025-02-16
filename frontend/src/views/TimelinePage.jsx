import React, { useEffect, useState } from "react";
import Card from "components/card";

const TimelinePage = () => {
    const [timelineEvents, setTimelineEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/timeline");
                if (!response.ok) throw new Error("Failed to fetch timeline");

                const data = await response.json();
                setTimelineEvents(data);
            } catch (error) {
                console.error("Error fetching timeline:", error);
                setTimelineEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTimeline();
    }, []);

    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Your Timeline</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Your personal history, day by day.</p>

            {/* Loading state */}
            {loading && <p className="mt-4 text-gray-600">Loading timeline...</p>}

            {/* No Data Found */}
            {!loading && timelineEvents.length === 0 && (
                <p className="mt-4 text-red-500">No events recorded yet.</p>
            )}

            {/* Timeline Events */}
            <div className="mt-6 w-full max-w-3xl">
                {timelineEvents.map((event, index) => (
                    <Card key={index} extra="mb-4 p-4">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold text-blue-500">{event.date}</span>
                            <p className="text-gray-700 dark:text-white">{event.event}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TimelinePage;
