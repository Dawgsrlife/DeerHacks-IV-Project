import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "components/dropdown";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsBell, BsCpu, BsFileEarmarkText } from "react-icons/bs";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import avatar from "assets/img/avatars/avatar.png";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input
  const handleSearch = async (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/search?desc=${searchQuery}`);
        if (response.data.images.length > 0) {
          navigate(`/admin/memory/${encodeURIComponent(searchQuery)}`, { state: { images: response.data.images, tags: response.data.tags || [] } });
        } else {
          alert("No memories found.");
        }
      } catch (error) {
        console.error("Error searching memories:", error);
      }
    }
  };

  return (
      <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        {/* Branding & Page Title */}
        <div className="ml-[6px]">
          <div className="h-6 w-[224px] pt-1">
            <Link className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white" to="#">
              {brandText}
            </Link>
          </div>
          <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
            <Link to="#" className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
              {brandText}
            </Link>
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl dark:!bg-navy-800 md:w-[365px] md:flex-grow-0">
          <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <p className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </p>
            <input
                type="text"
                placeholder="Search Memories..."
                className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:text-white"
                onKeyDown={handleSearch} // Added event listener
            />
          </div>

          {/* Sidebar Toggle (Mobile) */}
          <span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
          <FiAlignJustify className="h-5 w-5" />
        </span>

          {/* AI Notifications Dropdown */}
          <Dropdown
              button={<p className="cursor-pointer"><BsBell className="h-4 w-4 text-gray-600 dark:text-white" /></p>}
              children={
                <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl dark:bg-navy-700 dark:text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-navy-700 dark:text-white">AI Notifications</p>
                    <p className="text-sm font-bold text-navy-700 dark:text-white cursor-pointer">Mark all read</p>
                  </div>

                  <button className="flex w-full items-center">
                    <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 py-4 text-2xl text-white">
                      <BsFileEarmarkText />
                    </div>
                    <div className="ml-2 flex h-full w-full flex-col justify-center px-1 text-sm">
                      <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">AI Memory Retrieved</p>
                      <p className="text-xs text-left text-gray-900 dark:text-white">Your search results for "Trip to Japan 2023" are ready.</p>
                    </div>
                  </button>

                  <button className="flex w-full items-center">
                    <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-purple-500 to-purple-700 py-4 text-2xl text-white">
                      <BsCpu />
                    </div>
                    <div className="ml-2 flex h-full w-full flex-col justify-center px-1 text-sm">
                      <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">AI System Update</p>
                      <p className="text-xs text-left text-gray-900 dark:text-white">Memory indexing completed successfully.</p>
                    </div>
                  </button>
                </div>
              }
              classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
          />

          {/* Dark Mode Toggle */}
          <div className="cursor-pointer text-gray-600" onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}>
            {darkmode ? (
                <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
                <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>

          {/* User Profile Dropdown */}
          <Dropdown
              button={<img className="h-10 w-10 rounded-full" src={avatar} alt="AI Profile" />}
              children={
                <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl dark:bg-navy-700 dark:text-white">
                  <div className="p-4">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">👋 Welcome to Eterna</p>
                  </div>
                  <div className="h-px w-full bg-gray-200 dark:bg-white/20" />
                  <div className="flex flex-col p-4">
                    <a href="#" className="text-sm text-gray-800 dark:text-white hover:dark:text-white">Profile Settings</a>
                    <a href="#" className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white">AI Memory Preferences</a>
                    <a href="#" className="mt-3 text-sm text-red-500 hover:text-red-500 transition duration-150">Log Out</a>
                  </div>
                </div>
              }
              classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </nav>
  );
};

export default Navbar;
