import { useAppSelector } from "@/app/store";
import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";
import { useGetTasksQuery } from "@/state/services/api";
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import { Plus } from "lucide-react";
import React, { useMemo, useState } from "react";

type TimelineProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

// This is for the various representations of the horizontal bars in gantt chart
type TaskDisplayTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen }: TimelineProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <FetchingState />;

  if (error) {
    console.error("Error fetching tasks:", error);
    return <FetchingError message={"Sorry, Couldn't load timeline"} />;
  }

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTaskData = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        id: `Task-${task.id}`,
        name: task.title,
        type: "task" as TaskDisplayTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="mb-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
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
      </div>
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
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-green-primary px-3 py-2 text-white hover:bg-green-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus className="mr-2 h-6 w-6" />
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
