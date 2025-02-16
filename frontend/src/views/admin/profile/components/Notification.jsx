import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import Switch from "components/switch";
import React, { useEffect, useState } from "react";

const notificationOptions = [
    { id: "memory", label: "Memory Retrieval Updates" },
    { id: "query", label: "Query Processing Alerts" },
    { id: "insights", label: "Weekly AI Insights Report" },
    { id: "email", label: "Email me about important memories" },
];

function Notification() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("notificationSettings")) || {};
        setSettings(savedSettings);
    }, []);

    const handleToggle = (id) => {
        const updatedSettings = { ...settings, [id]: !settings[id] };
        setSettings(updatedSettings);
        localStorage.setItem("notificationSettings", JSON.stringify(updatedSettings));
    };

    return (
        <Card extra={"w-full h-full p-3"}>
            <div className="relative mb-3 flex items-center justify-between pt-1">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">AI Notifications</h4>
                <CardMenu />
            </div>

            {/* Notification Toggles */}
            <div className="flex flex-col gap-4">
                {notificationOptions.map(({ id, label }) => (
                    <div key={id} className="flex items-center gap-3">
                        <Switch id={id} checked={settings[id] || false} onChange={() => handleToggle(id)} />
                        <label htmlFor={id} className="text-base font-medium text-navy-700 dark:text-white">
                            {label}
                        </label>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Notification;
