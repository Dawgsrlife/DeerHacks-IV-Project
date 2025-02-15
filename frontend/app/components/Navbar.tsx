import React from "react";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
            <h1 className="text-xl font-bold">AI Life Search</h1>
            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg">Login</button>
            </div>
        </nav>
    );
}
