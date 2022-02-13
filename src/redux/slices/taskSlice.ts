import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskStateType } from '../reduxTypes';
import axios, { AxiosResponse } from 'axios';
import { TaskInterface } from '../../components/MainPage/MainPageTypesAndInterfaces';
import { ServerUrl } from '../..';

export const fetchInitialTasks = createAsyncThunk(
  'tasks/fetchInitialTasks',
  async () => {
    try {
      const response: AxiosResponse<TaskInterface[]> = await axios.get(`${ServerUrl}/getAllTasks`,
        {
          withCredentials: true,
          credentials: 'include'
        });
      return response.data;
    } catch(e) {
      console.log(e)
    }
    
  }
);

export const addTaskMiddleware = createAsyncThunk(
  'tasks/addTaskMiddleware',
  async ({ taskText, taskName, stage }: {
    taskName: string;
    taskText: string;
    stage: number;
  }) => {
    const response: AxiosResponse<TaskInterface> = await axios.post(`${ServerUrl}/createNewTask`,
      {
        taskText,
        taskName,
        stage,
      },
      {
        withCredentials: true,
        credentials: 'include'
      });

    return response.data;
  }
);

export const updateTaskMiddleware = createAsyncThunk(
  'task/updateTaskMiddleware',
  async ({ taskText, _id }: {
    taskText: string,
    _id: string
  }) => {
    await axios.patch(`${ServerUrl}/updateTask`,
      {
        taskText,
        _id
      });

    return { taskText, _id };
  }
);

export const updateStageMiddleware = createAsyncThunk(
  'task/updateStageMiddleware',
  async ({ stage, _id }: {
    stage: number,
    _id: string
  }) => {
    await axios.patch(`${ServerUrl}/changeTaskStage`,
      {
        stage,
        _id
      });

    return { stage, _id };
  }
);

export const deleteTaskMiddleware = createAsyncThunk(
  'task/deleteTaskMiddleware',
  async (_id: string) => {
    await axios.delete(`${ServerUrl}/deleteTask?_id=${_id}`)

    return _id;
  }
);

const initialState: TaskStateType = { tasks: [] }

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addInitialTasks: (state, action: { payload: TaskInterface[]; type: string }) => {
      state.tasks = action.payload;
    },
    addTaskToStore: (state, action: { payload: TaskInterface; type: string }) => {
      state.tasks.push(action.payload);
    },
    updateTaskTextInStore: (state, action: {
      payload: {
        taskText: string,
        _id: string
      };
      type: string;
    }) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].taskText = action.payload.taskText;
    },
    deleteTaskFromStore: (state, action: { type: string; payload: string; }) => {
      state.tasks = state.tasks.filter((elem) => elem._id !== action.payload);
    },
    updateStageInStore: (state, action: {
      payload: {
        stage: number,
        _id: string
      };
      type: string;
    }) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].stage = action.payload.stage;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchInitialTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(addTaskMiddleware.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTaskMiddleware.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].taskText = action.payload.taskText;
    });
    builder.addCase(deleteTaskMiddleware.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((elem) => elem._id !== action.payload);;
    });
    builder.addCase(updateStageMiddleware.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].stage = action.payload.stage;
    })
  },
});

export const {
  addInitialTasks,
  addTaskToStore,
  updateTaskTextInStore,
  deleteTaskFromStore,
  updateStageInStore,
} = tasksSlice.actions;

export default tasksSlice.reducer;