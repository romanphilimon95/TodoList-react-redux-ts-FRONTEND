import { createSlice } from '@reduxjs/toolkit';
import { ErrorSliceState, ErrorActionInterface } from '../reduxTypes';

const initialState : ErrorSliceState = {
    alertData: {
        isOpened: false,
        text: '',
    }
};

export const errorAlert = createSlice({
    name: 'errorAlert',
    initialState,
    reducers: {
        setAlert: (state, action: ErrorActionInterface) => {
            state.alertData.isOpened = action.payload.alertData.isOpened;
            state.alertData.text = action.payload.alertData.text;
        },
        removeAlert: state => {
            state.alertData.isOpened = false;
        }
    }
});

export const { setAlert, removeAlert } = errorAlert.actions;

export default errorAlert.reducer;