"use client";
import React from "react";
import Header from "@/components/Header";
import { v4 as uuidv4 } from "uuid";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  dataGridClassNames,
  MuiDataGridStyles,
} from "@/utils/MuiDataGridStyles";
import { useAppSelector } from "../store";
import { useGetTeamsQuery } from "@/state/services/api";
import FetchingState from "@/components/DataFetching/FetchingState";
import FetchingError from "@/components/DataFetching/FetchingError";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teamsWithUsername, isLoading, error } = useGetTeamsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        {isLoading && <FetchingState />}
        {error && (
          <FetchingError message={"An error occurred, while getting teams"} />
        )}
        <DataGrid
          rows={teamsWithUsername || []}
          getRowId={() => uuidv4()}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={MuiDataGridStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
