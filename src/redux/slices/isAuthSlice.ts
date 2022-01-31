import { createSlice } from '@reduxjs/toolkit';

export const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState: {
        access: true,
    },
    reducers: {
        allowAccess: state => {
            state.access = true;
        },
        denyAccess: state => {
            state.access = false;
        }
    }
});

export const { allowAccess, denyAccess } = isAuthSlice.actions;

export default isAuthSlice.reducer;