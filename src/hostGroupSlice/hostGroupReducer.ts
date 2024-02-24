import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../services/axiosInstance';
interface hostGroupItems {
  name: string;
  groupid: string;
}

export const fetchHostGroup = createAsyncThunk(
  '/core/hostgroup/get',
  async (props) => {
    console.log(props);
    
    const response = await instance.post('/core/hostgroup/get',props);
    return response.data.map((item:hostGroupItems) => ({
      label: item.name,
      value: item.groupid,
    }));
  }
);

const hostGroupSlice = createSlice({
  name: 'hostGroup',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostGroup.pending, (state) => {        
        state.status = 'loading';
      })
      .addCase(fetchHostGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHostGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default hostGroupSlice.reducer;
