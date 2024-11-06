import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

export interface Project {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
export enum Priority {
  urgent = "Urgent",
  high = "High",
  medium = "Medium",
  low = "Low",
  backLog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  launch = "Launch",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: number;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName?: string;
  taskId: number;
  uploadedBy: number;
  longitude: number;
  latitude: number;
  timeOfUpload: string;
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment;
  attachments?: Attachment;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (builder) => ({
    /**
     * This is a react-query endpoint that makes a GET request to the "projects" endpoint
     * and returns a list of projects.
     *
     * The `providesTags` option is used to tell react-query what type of data this endpoint
     * returns. In this case, it returns a list of projects, so we pass the string "Projects"
     * as the tag type.
     *
     * When the data is cached, react-query will store it in a cache with the key
     * "Projects". When we want to invalidate the cache, we can use the `invalidateTags`
     * option and pass the string "Projects" as the tag type.
     */
    getProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    /**
     * This is a react-query endpoint that makes a POST request to the "projects" endpoint
     * and returns a single project.
     *
     * The `invalidatesTags` option is used to tell react-query what type of data this endpoint
     * invalidates. In this case, it invalidates the cache for the "Projects" tag type.
     *
     * When this endpoint is called, react-query will invalidate the cache for the "Projects"
     * tag type. This means that the next time we call the `getProjects` endpoint, react-query
     * will make a new request to the server instead of returning the cached data.
     */
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTasks: builder.query<Task[], [projectId: number]>({
      query: (projectId) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: builder.mutation<
      Task,
      { taskId: number; status: Status }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api;
