import React from "react";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/services/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: currentUser } = useGetAuthUserQuery({
    refetchOnMountOrArgChange: true,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;
  return (
    <div
      className={`z-30"} flex items-center justify-between bg-white px-4 py-3 dark:bg-black`}
    >
      {/* Hamburger menu */}
      <div className="flex items-center gap-8">
        {isSideBarCollapsed && (
          <button
            className="cursor-pointer rounded-md border-none p-2 outline-none hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}
          >
            <Menu className="dark:text-white" />
          </button>
        )}
      </div>
      {/* search bar */}
      <div className="relative flex h-full w-[300px] rounded border-solid bg-gray-100 py-3 dark:bg-gray-800">
        <Search
          className="absolute left-2 top-1/2 mr-2 -translate-y-1/2 transform cursor-pointer dark:text-white"
          size={23}
        />
        <input
          type="text"
          placeholder="Search..."
          className="h-full w-full rounded border-none bg-transparent pl-11 pr-4 text-lg placeholder-gray-500 outline-none focus:border-transparent focus:outline-none dark:text-white dark:placeholder-white"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center">
        {/* Dark mode toggle */}
        <button
          className={
            isDarkMode
              ? "rounded-md p-2 dark:text-white dark:hover:bg-gray-600"
              : "rounded-md p-2 hover:bg-gray-100"
          }
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <Sun size={26} /> : <Moon size={26} />}
        </button>
        {/* Settings */}
        <Link
          href="/settings"
          className="cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Settings className="dark:text-white" />
        </Link>

        {/* separator */}
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

        {/* Profile */}
        <div className="hidden items-center justify-between gap-2 md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://project-mgt-s3-images-bucket.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                width={100}
                height={50}
                alt={currentUserDetails?.username || "User Profile Picture"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="hidden rounded bg-green-primary px-4 py-2 text-xs font-bold text-white hover:bg-green-600 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
