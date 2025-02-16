import Card from "components/card";
import React from "react";

const General = () => {
  return (
      <Card extra={"w-full h-full p-3"}>
        {/* Header */}
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Eterna - AI-Powered Memory Search
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600">
            Eterna transforms the way we retrieve memories. Leveraging advanced AI models,
            it enables users to search past conversations, notes, and moments using natural
            language queries. From finding that one nostalgic photo to recalling an old voice memo,
            Eterna brings your personal history to life.
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 px-2">

          {/* AI Model Used */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">AI Model</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              DeepSeek + Gemini API
            </p>
          </div>

          {/* Search Capabilities */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Supported Searches</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Text, Images, Voice Memos
            </p>
          </div>

          {/* Storage Method */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Storage System</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              AWS DynamoDB (Cloud) + Local Storage
            </p>
          </div>

          {/* Timeline Functionality */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Time-Based Querying</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Search by Date, Event, or Context
            </p>
          </div>

          {/* Authentication */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Authentication</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Google OAuth (Optional)
            </p>
          </div>

          {/* AI Processing Speed */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Avg Processing Time</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              180ms per Query
            </p>
          </div>
        </div>
      </Card>
  );
};

export default General;
