"use client";
import { motion } from "framer-motion";

const Sidebar = () => {
    return (
        <motion.aside
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-64 bg-gray-800 h-screen p-5 text-white fixed left-0 top-0"
        >
            <h2 className="text-lg font-semibold mb-4">Documentation</h2>
            <ul className="space-y-2">
                {["Getting Started", "Core Concepts", "Utilities"].map((item, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <a href="#" className="block hover:bg-gray-700 p-2 rounded">{item}</a>
                    </motion.li>
                ))}
            </ul>
        </motion.aside>
    );
};

export default Sidebar;
