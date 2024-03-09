import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../services/axiosInstance";

export interface hostGroupItems {
  value?: string | number;
  label?: string;
  map?: string[];
  groupid?: number;
  name?: string;
  groups?: { groupid: number; name: string }[];
}
// apiSlice.ts

interface ApiState {
  data: hostGroupItems[]; // Define your data type here
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  loading: true,
  error: null,
};

// Create slice
const apiSlice = createSlice({
  name: "hostGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchHostGroup.pending, (state, action) => {
        console.log("pending", action);
        state.loading = true;
      })
      .addCase(fetchHostGroup.fulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.data = action.payload;
        state.loading = false;

        // Handle fulfilled case if needed
      })
      .addCase(fetchHostGroup.rejected, (state, action) => {
        state.loading = false;
        if (action.error.code === "ERR_NETWORK") {
          location.href = "/";
        }
        // Handle rejected case if needed
      });
  },
});

// Export reducer
export default apiSlice.reducer;

// Define async action creator
export const fetchHostGroup = createAsyncThunk(
  "/core/hostgroup/get",
  async () => {
    const response = await instance.post("/core/hostgroup/get", {});
    return response.data;
  }
);
