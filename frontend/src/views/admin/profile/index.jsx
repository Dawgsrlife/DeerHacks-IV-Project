import Banner from "./components/Banner";
import Notification from "./components/Notification";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { Link } from "react-router-dom";

const ProfileOverview = () => {
    return (
        <div className="flex w-full flex-col gap-5">
            {/* Banner Section */}
            <div className="w-full mt-3">
                <Banner />
            </div>

            {/* Upload Section */}
            <div className="w-full">
                <Upload />
            </div>

            {/* Link to Personal Tasks Page */}
            <div className="w-full flex justify-center">
                <Link to="/admin/personal-tasks" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Manage Your Tasks
                </Link>
            </div>

            {/* Storage & Notification */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="col-span-6">
                    <Storage />
                </div>
                <div className="col-span-6">
                    <Notification />
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
