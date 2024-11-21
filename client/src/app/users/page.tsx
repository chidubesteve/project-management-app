"use client";

import React from "react";
import { useAppSelector } from "../store";
import Header from "@/components/Header";
import { v4 as uuidv4 } from "uuid";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import {
  MuiDataGridStyles,
  dataGridClassNames,
} from "@/utils/MuiDataGridStyles";
import { useGetAllUsersQuery, User } from "@/state/services/api";
import { Alert, AlertTitle } from "@mui/material";
import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value || "default_avatar.png"}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    field: "teamId",
    headerName: "Team ID",
    width: 100,
  },
];

const Users = () => {
  const { data: usersData, isLoading, error } = useGetAllUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <FetchingState />;
  if (error as any) {
    <FetchingError message={"An error occurred, while getting users"} />;
    console.log("fetching users error", error);
  }

  const users =
    usersData?.map((user, index) => ({ ...user, id: index + 1 })) || [];

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
