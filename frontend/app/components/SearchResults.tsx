"use client";
import { motion } from "framer-motion";

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const SearchResults = ({ results }: { results: { id: string; title: string; summary: string }[] }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            {results.map((result) => (
                <motion.div
                    key={result.id}
                    variants={itemVariants}
                    className="bg-gray-800 p-4 rounded-lg mb-2"
                >
                    <h3 className="text-xl font-semibold">{result.title}</h3>
                    <p className="text-gray-400">{result.summary}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default SearchResults;
