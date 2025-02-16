import React from "react";

// Admin Imports
import Profile from "views/admin/profile";
import Statistics from "views/admin/default";

// Icon Imports
import { MdPerson, MdBarChart, MdTask } from "react-icons/md";
import ClockIcon from "components/icons/ClockIcon"; // Memory Icon
import TablesIcon from "components/icons/TablesIcon"; // Timeline Icon

// Page Imports
import MemoryPage from "views/MemoryPage";
import TimelinePage from "views/TimelinePage";
import PersonalTasks from "views/PersonalTasksPage.jsx";

const routes = [
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Memory",
    layout: "/admin",
    path: "memory/:query",
    icon: <ClockIcon className="h-6 w-6" />,
    component: <MemoryPage />,
  },
  {
    name: "Timeline",
    layout: "/admin",
    path: "timeline",
    icon: <TablesIcon className="h-6 w-6" />,
    component: <TimelinePage />,
  },
  {
    name: "Personal Tasks",
    layout: "/admin",
    path: "personal-tasks",
    icon: <MdTask className="h-6 w-6" />,
    component: <PersonalTasks />,
  },
  {
    name: "Statistics",
    layout: "/admin",
    path: "statistics",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Statistics />,
  },
];

export default routes;
