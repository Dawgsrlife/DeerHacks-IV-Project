import React from "react";

// Admin Imports
import Profile from "views/admin/profile";
import Statistics from "views/admin/default";

// Icon Imports
import { MdHome, MdPerson, MdBarChart } from "react-icons/md"; // Added MdBarChart for Statistics

const routes = [
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Statistics",
    layout: "/admin",
    path: "default",
    icon: <MdBarChart className="h-6 w-6" />, // Updated icon to represent stats
    component: <Statistics />,
  },
];

export default routes;
