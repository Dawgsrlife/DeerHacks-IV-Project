import MiniCalendar from "components/calendar/MiniCalendar";
import AIRequestTrends from "./components/AIRequestTrends";
import AIMemoryUsage from "./components/AIMemoryUsage";
import AIMemoryChart from "./components/AIMemoryChart";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdMemory } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/aiTableColumns";

import Widget from "components/widget/Widget";
import AIQueryTable from "./components/AIQueryTable";
import AIDetailedTable from "./components/AIDetailedTable";
import AIQueryTraffic from "./components/AIQueryTraffic";
import AITaskManager from "./components/AITaskManager";
import tableDataCheck from "./variables/aiTableDataQueries.json";
import tableDataComplex from "./variables/aiTableDataDetailed.json";

const Dashboard = () => {
  return (
      <div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"AI Queries Processed"}
              subtitle={"1,245"}
          />
          <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"AI Memory Usage"}
              subtitle={"1.3GB"}
          />
          <Widget
              icon={<MdMemory className="h-7 w-7" />}
              title={"System Memory Available"}
              subtitle={"2.7GB"}
          />
          <Widget
              icon={<MdBarChart className="h-6 w-6" />}
              title={"AI Tasks Completed"}
              subtitle={"145"}
          />
          <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Pending AI Requests"}
              subtitle={"37"}
          />
          <Widget
              icon={<IoMdHome className="h-6 w-6" />}
              title={"Total AI Logs"}
              subtitle={"2,433"}
          />
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AIMemoryUsage />
          <AIRequestTrends />
        </div>

        {/* Tables & Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Check Table */}
          <div>
            <AIQueryTable
                columnsData={columnsDataCheck}
                tableData={tableDataCheck}
            />
          </div>

          {/* AI Query Traffic & Pie Chart */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <AIQueryTraffic />
            <AIMemoryChart />
          </div>

          {/* Complex Table , Task & Calendar */}

          <AIDetailedTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
          />

          {/* Task chart & Calendar */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <AITaskManager />
            <div className="grid grid-cols-1 rounded-[20px]">
              <MiniCalendar />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
