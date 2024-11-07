import Header from "@/components/Header";
import { Clock, Filter, Grid3X3, List, Share2, Table } from "lucide-react";
import React, { useState } from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  return (
    <div className="px-4 xl:px-8">
      {/* Modal New Project */}
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="ENSG PROJECT METER" />
      </div>
      {/* tabs */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 size={15} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<List size={15} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock size={15} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table size={15} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 size={20} />
                  </button>
                  <div className="relative flex items-center">
                      <input type="text" name="search task" id="searchTask" placeholder="Search Task" className="rounded-md py-2 flex outline-gray-200 outline-2 outline dark:outline-gray-500 items-center pl-11 pr-4 focus:outline-green-500 dark:focus:outline-green-600 text-base leading-3 dark:border-dark-secondary dark:bg-dark-secondary dark:text-white dark:placeholder-white" />
                      <Grid3X3 className="absolute left-2.5 bottom-2 h-4 w-4-text-gray-400 dark:text-neutral-300" />
                  </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-base font-medium text-gray-500 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full hover:text-green-600 hover:after:w-full dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive && "text-green-600 after:bg-green-600 dark:text-white"}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
