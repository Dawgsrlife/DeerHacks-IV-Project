import React, { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");

    return (
        <div className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg shadow-md">
            <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                placeholder="Search memories, notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={() => onSearch(query)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
                Search
            </button>
        </div>
    );
}
