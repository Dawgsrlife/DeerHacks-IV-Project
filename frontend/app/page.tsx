"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Timeline from "@/components/Timeline";

export default function HomePage() {
    const [results, setResults] = useState([]);
    const [timelineEvents, setTimelineEvents] = useState([]);

    const handleSearch = async (query: string) => {
        setResults([{ id: "1", title: "Meeting Notes", summary: "Discussed AI integration..." }]);
        setTimelineEvents([{ date: "Feb 12, 2025", title: "Ethan shared an ASMR video" }]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />
            <div className="flex-1 ml-64 p-6">
                <Navbar />
                <SearchBar onSearch={handleSearch} />
                <SearchResults results={results} />
                <Timeline events={timelineEvents} />
            </div>
        </div>
    );
}
