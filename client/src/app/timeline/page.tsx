"use client";

import { useAppSelector } from "@/app/store";
import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";
import { useGetProjectsQuery } from "@/state/services/api";
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import React, { useMemo, useState } from "react";
import Header from "@/components/Header";

// This is for the various representations of the horizontal bars in gantt chart
type TaskDisplayTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: projects,
    isLoading,
    isFetching,
    error,
    } = useGetProjectsQuery();
      const ganttTaskData = useMemo(() => {
        return (
          projects?.map((project) => ({
            start: new Date(project.startDate as string),
            end: new Date(project.endDate as string),
            id: `Project-${project.id}`,
            name: project.name,
            type: "project" as TaskDisplayTypeItems,
            progress: 50,
            styles: {
              progressColor: "#13802A",
              progressSelectedColor: "#ff9e0d",
            },
            isDisabled: false,
          })) || []
        );
      }, [projects]);

  if (isLoading || isFetching) return <FetchingState />;

  if (error) {
    console.error("Error fetching tasks:", error);
    return (
      <FetchingError
        message={"Sorry, An error occurred while fetching projects"}
      />
    );
  }

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Project's Timeline" />
        <div className="relative inline-flex w-64">
          <select
            name="select timeline"
            onChange={handleViewModeChange}
            value={displayOptions.viewMode}
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-100 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option selected value={ViewMode.Month}>
              Month
            </option>
            <option value={ViewMode.Year}>Year</option>
          </select>
        </div>
      </header>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTaskData}
            {...displayOptions}
            columnWidth={
              displayOptions.viewMode === ViewMode.Year
                ? 200
                : displayOptions.viewMode === ViewMode.Month
                  ? 150
                  : 100
            }
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
