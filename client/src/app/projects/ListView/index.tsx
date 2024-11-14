import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/services/api";
import { Plus } from "lucide-react";
import React from "react";

type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <FetchingState />;

  if (error) {
    console.error("Error fetching tasks:", error);
    return <FetchingError message={"Sorry, Couldn&apos;t fetch tasks"} />;
  }
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-green-primary px-3 py-2 text-white hover:bg-green-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus className="mr-2 h-6 w-6" />
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
