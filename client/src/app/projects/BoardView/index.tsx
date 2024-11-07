import React, { useState } from "react";
import {
  Status,
  Task as TaskType,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/services/api";
import {
  AlertCircle,
  EllipsisVertical,
  MessageSquareMore,
  Plus,
} from "lucide-react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { formatDateToLocalTime } from "@/utils/dateFormater";
import Image from "next/image";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const taskStatus = Object.values(Status);

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  console.log("This is the result from the number: ", Number(id));
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: Status) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (error as FetchBaseQueryError) {
    console.error("Error fetching projects:", error);
    return (
      <div className="flex h-[60vh] w-[100%] items-center justify-center self-end">
        <AlertCircle className="dark:text-white" />
        <p className="ml-2 text-lg font-medium dark:text-white">
          Sorry, Couldn&apos;t load tasks
        </p>
      </div>
    );
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid h-[calc()] grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-2 xl:grid-cols-3">
        {/* 2xl:grid-cols-4 styling for extra large screens */}
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: Status;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: Status) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const taskCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<Status, string> = {
    [Status.ToDo]: "#9CA3AF", // Gray - Represents tasks that are yet to start, calm and unobtrusive.
    [Status.Launch]: "#3B82F6", // Blue - Symbolizes new beginnings, often associated with product launches.
    [Status.WorkInProgress]: "#05613a", // Green - Progressing well, suggesting movement and growth.
    [Status.UnderReview]: "#F59E0B", // Amber - Indicates caution and review, which fits well with a review stage.
    [Status.Completed]: "#22C55E", // Bright Green - Signals success and completion, a clear positive indicator.
  };

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className={`rounded-lg py-2 sm:py-4 xl:px-2 ${
        isOver ? "bg-green-100 dark:bg-neutral-950" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            <span
              className="ml-3 flex items-center justify-center rounded-full bg-gray-200 p-1 text-sm leading-none dark:bg-dark-tertiary dark:text-white"
              style={{ width: "1.6rem", height: "1.6rem" }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex flex-1 items-center justify-end">
            <button className="mr-2.5 flex h-6 w-6 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Task list */}
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [openComments, setOpenComments] = useState(false);

  const taskTagSplit = task.tags ? task.tags.split(",") : [];

  const startDate = task.startDate && formatDateToLocalTime(task.startDate);
  const dueDate = task.dueDate && formatDateToLocalTime(task.dueDate);

  const noOfComments = (task.comments && task.comments.length) || 0;

  const handleOpenComments = (id: number) => {
    setOpenComments(!openComments);
  };

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"} ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName || "Task Attachment"}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-row flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-6 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} className="" />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>{" "}
          {typeof task.points === "number" && (
            <span className="text-sm font-semibold dark:text-white">
              {task.points} pts
            </span>
          )}
        </div>

        <div className="text-sx text-gray-500 dark:text-neutral-500">
          {startDate && <span>{startDate}</span>} {"\u00A0\u2013\u00A0"}
          {dueDate && <span>{dueDate}</span>}
        </div>
        <p className="mt-2 text-base text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="ml-4 border-t border-gray-200 dark:border-stroke-dark" />

        {/* Assigned users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}

            {/* AUTHOR OF TASK */}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div
            className="flex-items-center text-gray-500 dark:text-neutral-500"
            onClick={() => handleOpenComments(task.id)}
          >
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {noOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
