import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../../assets/img/app-img.png";

export default function LoginRegisterLayout() {
  return (
    <>
      {/* Login header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-screen relative">
        {/* Outlet */}
        <div className="flex items-center justify-center p-4">
          <Outlet />
        </div>

        {/* Divider */}
        <div className="absolute top-1/4 bottom-1/4 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 opacity-50"></div>

        {/* Carousel */}
        <div className="bg-white flex justify-center items-center p-4 ml-10">
          <img src={logo} alt="app-image" className="max-w-full h-auto" />
        </div>
      </div>
      {/* Step process content */}
    </>
  );
}
