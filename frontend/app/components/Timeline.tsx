import React from "react";

type TimelineEvent = {
    date: string;
    title: string;
};

export default function Timeline({ events }: { events: TimelineEvent[] }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">Timeline</h2>
            {events.map((event, index) => (
                <div key={index} className="p-2 bg-gray-700 rounded-lg mb-2">
                    <span className="text-gray-400">{event.date}</span>
                    <p className="text-white">{event.title}</p>
                </div>
            ))}
        </div>
    );
}
