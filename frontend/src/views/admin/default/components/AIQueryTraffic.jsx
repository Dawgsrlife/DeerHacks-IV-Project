import BarChart from "components/charts/BarChart";
import { barChartDataAIQueries } from "variables/charts";
import { barChartOptionsAIQueries } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Card from "components/card";

const AIQueryTraffic = () => {
  return (
      <Card extra="pb-7 p-[20px]">
        <div className="flex flex-row justify-between">
          <div className="ml-1 pt-2">
            <p className="text-sm font-medium leading-4 text-gray-600">
              Daily AI Queries
            </p>
            <p className="text-[34px] font-bold text-navy-700 dark:text-white">
              1,245 {" "}
              <span className="text-sm font-medium leading-6 text-gray-600">
              Processed Queries
            </span>
            </p>
          </div>
          <div className="mt-2 flex items-start">
            <div className="flex items-center text-sm text-green-500">
              <MdArrowDropUp className="h-5 w-5" />
              <p className="font-bold"> +3.12% </p>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full pt-10 pb-0">
          <BarChart
              chartData={barChartDataAIQueries}
              chartOptions={barChartOptionsAIQueries}
          />
        </div>
      </Card>
  );
};

export default AIQueryTraffic;
