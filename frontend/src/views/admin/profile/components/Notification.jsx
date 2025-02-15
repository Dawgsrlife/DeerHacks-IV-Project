import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import Switch from "components/switch";
import React from "react";

function Notification() {
  return (
      <Card extra={"w-full h-full p-3"}>
        <div className="relative mb-3 flex items-center justify-between pt-1">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            AI Notifications
          </h4>
          <CardMenu />
        </div>
        <div className="flex flex-col">
          {/* AI Memory Notifications */}
          <div className="mt-3 flex items-center gap-3">
            <Switch id="switch1" />
            <label
                htmlFor="switch1"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              AI Memory Retrieval Updates
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch2" />
            <label
                htmlFor="switch2"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              AI Query Processing Alerts
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch3" />
            <label
                htmlFor="switch3"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              Search Summary & Tagging Notifications
            </label>
          </div>

          {/* Time-Based Notifications */}
          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch4" />
            <label
                htmlFor="switch4"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              Reminders for Time-Based Queries
            </label>
          </div>

          {/* AI System & Performance */}
          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch5" />
            <label
                htmlFor="switch5"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              AI Model Performance Alerts
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch6" />
            <label
                htmlFor="switch6"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              System Memory & Storage Warnings
            </label>
          </div>

          {/* User Engagement */}
          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch7" />
            <label
                htmlFor="switch7"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              AI Feature Updates & New Capabilities
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch8" />
            <label
                htmlFor="switch8"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              Weekly AI Insights & Usage Report
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Switch id="switch9" />
            <label
                htmlFor="switch9"
                className="text-base font-medium text-navy-700 dark:text-white"
            >
              Email me if AI detects important memories
            </label>
          </div>
        </div>
      </Card>
  );
}

export default Notification;
