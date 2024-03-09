import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import hostGroupReducer from '../hostGroupSlice/hostGroupReducer';
import { thunk } from 'redux-thunk';

const stores = configureStore({
  reducer: {
    hostGroup: hostGroupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

})
export type RootState = ReturnType<typeof stores.getState>
export type AppDispatch = typeof stores.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectApiData = (state: RootState) => state.hostGroup.data;
export const selectApiLoading = (state: RootState) => state.hostGroup.loading;
export const selectApiError = (state: RootState) => state.hostGroup.error;


export default stores

