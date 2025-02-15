import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import image2 from "assets/img/profile/image2.png";
import image3 from "assets/img/profile/image3.png";
import Card from "components/card";

const Project = () => {
  return (
      <Card extra={"w-full p-4 h-full"}>
        <div className="mb-8 w-full">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Eterna AI Modules
          </h4>
          <p className="mt-2 text-base text-gray-600">
            Explore the key components of Eterna's AI-powered memory search system.
            Each module plays a role in processing, storing, and retrieving your personal data.
          </p>
        </div>

        {/* AI-Powered Search */}
        <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center">
            <div>
              <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="Memory Search" />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                AI-Powered Memory Search
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Uses **DeepSeek AI** to retrieve past conversations, images, and notes
                through natural language search.
              </p>
            </div>
          </div>
          <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
            <MdModeEditOutline />
          </div>
        </div>

        {/* Data Storage & Indexing */}
        <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center">
            <div>
              <img className="h-[83px] w-[83px] rounded-lg" src={image3} alt="Data Storage" />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                Data Storage & Indexing
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Stores user memories securely using **AWS DynamoDB** and **local storage**,
                optimized for fast retrieval.
              </p>
            </div>
          </div>
          <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
            <MdModeEditOutline />
          </div>
        </div>

        {/* System Architecture */}
        <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center">
            <div>
              <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="System Architecture" />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                System Architecture
              </p>
              <p className="mt-2 text-sm text-gray-600">
                The backend uses **FastAPI + Spring Boot**, integrating AI models and a
                structured data pipeline for real-time search.
              </p>
            </div>
          </div>
          <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
            <MdModeEditOutline />
          </div>
        </div>
      </Card>
  );
};

export default Project;
