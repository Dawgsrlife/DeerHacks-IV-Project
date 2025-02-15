"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Timeline from "@/components/Timeline";

export default function HomePage() {
    const [results, setResults] = useState([]);
    const [timelineEvents, setTimelineEvents] = useState([]);

    const handleSearch = async (query: string) => {
        // Simulated search function
        setResults([
            { id: "1", title: "Meeting Notes", summary: "Discussed AI integration..." },
            { id: "2", title: "Shopping List", summary: "Milk, eggs, bread..." },
        ]);

        setTimelineEvents([
            { date: "Feb 12, 2025", title: "Ethan shared an ASMR video" },
            { date: "Feb 10, 2025", title: "Studied CSC209" },
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto p-4">
                <SearchBar onSearch={handleSearch} />
                <SearchResults results={results} />
                <Timeline events={timelineEvents} />
            </div>
        </div>
    );
}
