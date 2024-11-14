import { useAppSelector } from "@/app/store";
import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";
import Header from "@/components/Header";
import { useGetTasksQuery } from "@/state/services/api";
import { dataGridClassNames, MuiDataGridStyles } from "@/utils/MuiDataGridStyles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import React from "react";

type TableViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
  {
    field: "LGA",
    headerName: "L.G.A",
    width: 150,
    renderCell: (params) => params.value || "-",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: TableViewProps) => {
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
  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
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
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={MuiDataGridStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableView;
