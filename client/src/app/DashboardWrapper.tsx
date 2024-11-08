"use client";
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <div className="flex max-h-screen min-h-full w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      <main
        className={`flex w-full overflow-y-scroll flex-col bg-gray-50 dark:bg-dark-bg ${isSideBarCollapsed ? "" : "md:pl-[1/5]"}`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    <DashboardLayout>{children}</DashboardLayout>
  </StoreProvider>
);

export default DashboardWrapper;
