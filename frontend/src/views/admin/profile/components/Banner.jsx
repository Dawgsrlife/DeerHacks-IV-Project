import React from "react";
import avatar from "assets/img/avatars/avatar.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const Banner = () => {
    return (
        <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
            {/* Background and AI logo */}
            <div
                className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-blue-500 dark:!border-navy-700">
                    <img className="h-full w-full rounded-full" src={avatar} alt="Eterna AI" />
                </div>
            </div>

            {/* App Name and Tagline */}
            <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Eterna AI
                </h4>
                <p className="text-base font-normal text-gray-600">
                    Your Personal AI-Powered Memory Engine
                </p>
            </div>

            {/* AI Search Metrics */}
            <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                        58.2K
                    </p>
                    <p className="text-sm font-normal text-gray-600">Queries Processed</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                        180ms
                    </p>
                    <p className="text-sm font-normal text-gray-600">Avg Search Speed</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">
                        732
                    </p>
                    <p className="text-sm font-normal text-gray-600">Active Sessions</p>
                </div>
            </div>
        </Card>
    );
};

export default Banner;
