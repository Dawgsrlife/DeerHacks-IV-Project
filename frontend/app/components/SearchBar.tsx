"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative my-4"
        >
            <motion.input
                whileFocus={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
            />
        </motion.div>
    );
};

export default SearchBar;
