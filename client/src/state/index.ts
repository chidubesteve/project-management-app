import { createSlice } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSideBarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSideBarCollapsed: false,
  isDarkMode: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarCollapsed: (state, action) => {
      state.isSideBarCollapsed = action.payload;
      },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setIsDarkMode, setIsSideBarCollapsed} = globalSlice.actions;
export default globalSlice.reducer;
