"use client";
import { motion } from "framer-motion";

const Timeline = ({ events }: { events: { date: string; title: string }[] }) => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-3">Timeline</h2>
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gray-800 p-3 rounded-lg mb-2"
                >
                    <p className="text-blue-400">{event.date}</p>
                    <h3 className="text-lg">{event.title}</h3>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
