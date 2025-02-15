import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";

const AITaskManager = () => {
  return (
      <Card extra="pb-7 p-[20px]">
        {/* Task header */}
        <div className="relative flex flex-row justify-between">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
              <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
            </div>
            <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
              AI Processing Tasks
            </h4>
          </div>
          <CardMenu />
        </div>

        {/* Task content */}

        <div className="h-full w-full">
          <div className="mt-5 flex items-center justify-between p-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                AI Query Optimization
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between p-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                AI Summarization Execution
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between p-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Data Indexing & Classification
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between p-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Memory Optimization
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between p-2">
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                AI Model Testing
              </p>
            </div>
            <div>
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>
        </div>
      </Card>
  );
};

export default AITaskManager;
