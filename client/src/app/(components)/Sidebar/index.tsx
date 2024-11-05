"use client";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  House,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import HomeIcon from "@mui/material/Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { setIsSideBarCollapsed } from "@/state";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [teamName, setTeamName] = useState("Chidube");

  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );

  const sideBarClassNames = `flex flex-col h-auto justify-between shadow-xl transition-all duration-300 dark:bg-black dark:text-white overflow-y-auto bg-white ${isSideBarCollapsed ? "w-0 hidden" : "w-1/5"} z-40`;
  return (
    <div className={sideBarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* logo */}
        <div className="z-50 flex min-h-[56px] w-full items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="flex items-center gap-1 text-xl font-bold text-gray-800 dark:text-white">
            <Image
              src="/ensg-logo.png"
              alt="logo"
              width={40}
              height={40}
            />{" "}
            ENSG PROJECT METER
          </div>
          {!isSideBarCollapsed && (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))
              }
              title="Close sidebar"
            >
              <X
                className="text-gray-800 transition-transform duration-100 hover:rotate-90 hover:text-gray-500 dark:text-white"
                size={20}
              />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${teamName}`}
            alt="team avatar"
            width={40}
            height={40}
            unoptimized={true}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {teamName}&apos;s Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-300 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar links */}
        <nav className="z-10 w-full">
          <SideBarLinks Icon={House} label="Dashboard" href="/" />
          <SideBarLinks Icon={Briefcase} label="Timeline" href="/timeline" />
          <SideBarLinks Icon={Search} label="Search" href="/search" />
          <SideBarLinks Icon={Settings} label="Settings" href="/settings" />
          <SideBarLinks Icon={User} label="Users" href="/users" />
          <SideBarLinks Icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* PROJECTS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="text-base font-medium">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Projects list */}

        {/* PRIORITY LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="text-base font-medium">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SideBarLinks
              Icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SideBarLinks
              Icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SideBarLinks
              Icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SideBarLinks
              Icon={AlertOctagon}
              label="Low"
              href="/priority/low"
            />
            <SideBarLinks
              Icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  Icon: LucideIcon;
  label: string;
}

const SideBarLinks = ({ href, Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 p-3 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive && "bg-green-100 text-white hover:bg-green-100 dark:bg-green-600 hover:dark:bg-green-600"} justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-green-300" />
        )}
        <Icon
          className={`h-6 w-6 text-gray-800 ${isActive && "text-green-800"} dark:text-gray-100`}
        />
        <span
          className={`text-base font-medium text-gray-800 ${isActive && "text-green-800"} dark:text-gray-100`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
