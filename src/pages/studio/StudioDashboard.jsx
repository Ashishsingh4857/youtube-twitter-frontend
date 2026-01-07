import React from "react";
import { VideoTable } from "../../components/index.js";

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div>
        <h1 className="text-2xl font-bold  pb-9 pt-6 pl-8 text-white ">
          Channel Dashboard
        </h1>
      </div>
      <VideoTable />
    </div>
  );
};

export default Dashboard;
