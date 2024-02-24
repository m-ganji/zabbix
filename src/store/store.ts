import { configureStore } from '@reduxjs/toolkit';
import hostGroupReducer from '../hostGroupSlice/hostGroupReducer';

const stores = configureStore({
  reducer: {
    hostGroup: hostGroupReducer,
  },
})
export type RootState = ReturnType<typeof stores.getState>
export type AppDispatch = typeof stores.dispatch;

export default stores

