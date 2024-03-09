import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../services/axiosInstance";
import { AppThunk } from "../store/store";
import { AxiosError } from "axios";
interface hostGroupItems {
  name: string;
  value: string;
}
// apiSlice.ts

interface ApiState {
  data: hostGroupItems[]; // Define your data type here
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
};

// Define interface for API response
interface ApiResponse {
  name: string;
  value: string;
}

// Create slice
const apiSlice = createSlice({
  name: "hostGroup",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<ApiResponse>) {
      state.loading = false;
      state.data = [action.payload];
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export action creators
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  apiSlice.actions;

// Export reducer
export default apiSlice.reducer;

interface fetchData {}

// Define async action creator
export const fetchHostGroup =
  (props: fetchData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchDataStart());
      const response = await instance.post("/core/hostgroup/get", props);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        dispatch(fetchDataFailure(axiosError.message));
      } else {
        dispatch(fetchDataFailure("An error occurred."));
      }
    }
  };
