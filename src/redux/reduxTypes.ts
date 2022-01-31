import { TaskInterface } from '../components/MainPage/MainPageTypesAndInterfaces';
import { store } from './store';

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type TaskStateType = {
    tasks: TaskInterface[];
}

export type ErrorSliceState = {
    alertData: {
        isOpened: boolean;
        text: string;
    };
}
export interface ErrorActionInterface {
    type: string;
    payload: ErrorSliceState;
}


export type addCaseType = { tasks: { tasks: TaskInterface[] } } 