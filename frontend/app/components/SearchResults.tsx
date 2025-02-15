import React from "react";

type SearchResult = {
    id: string;
    title: string;
    summary: string;
};

export default function SearchResults({ results }: { results: SearchResult[] }) {
    return (
        <div className="p-4">
            {results.length === 0 ? (
                <p className="text-gray-400">No results found.</p>
            ) : (
                results.map((result) => (
                    <div key={result.id} className="p-4 mb-4 bg-gray-700 rounded-lg">
                        <h2 className="text-lg font-semibold text-white">{result.title}</h2>
                        <p className="text-gray-300">{result.summary}</p>
                    </div>
                ))
            )}
        </div>
    );
}
