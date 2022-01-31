import { configureStore } from '@reduxjs/toolkit';
import errorAlertReducer from './slices/errorAlertSlice';
import taskReducer from './slices/taskSlice';
import isAuthReducer from './slices/isAuthSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    isAuth: isAuthReducer,
    errorAlert: errorAlertReducer,
  }
});