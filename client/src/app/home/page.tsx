"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/services/api";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useAppSelector } from "../store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatISO } from "date-fns";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dataGridClassNames,
  MuiDataGridStyles,
} from "@/utils/MuiDataGridStyles";
import FetchingState from "@/components/DataFetching/FetchingState";
import FetchingError from "@/components/DataFetching/FetchingError";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
    renderCell: (params) =>
      formatISO(new Date(params.row.startDate), {
        representation: "date",
      }),
  },
  {
    field: "endDate",
    headerName: "Due Date",
    width: 200,
    renderCell: (params) =>
      formatISO(new Date(params.row.dueDate), {
        representation: "date",
      }),
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: projectsData,
    isLoading,
    error: projectsError,
  } = useGetProjectsQuery();
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({
    projectId: parseInt("6"),
  });

  if (isLoading || tasksLoading) {
    return <FetchingState />;
  }

  if (projectsError) {
    return <FetchingError message={"Sorry, Couldn't fetch projects"} />;
  }

  if (tasksError) {
    return <FetchingError message={"Sorry, Couldn't fetch tasks"} />;
  }

  // Calculate priority distribution for tasks
  const priorityCount = tasksData?.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  const taskDistribution =
    priorityCount &&
    Object.keys(priorityCount).map((key) => ({
      name: key,
      count: priorityCount[key],
    }));

  // Calculate project status distribution
  const statusCount = projectsData?.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus =
    statusCount &&
    Object.keys(statusCount).map((key) => ({
      name: key,
      count: statusCount[key],
    }));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasksData}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowId={() => uuidv4()}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={MuiDataGridStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
