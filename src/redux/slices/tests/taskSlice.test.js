import reducer, {
    fetchInitialTasks,
    addTaskMiddleware,
    updateTaskTextInStore,
    deleteTaskFromStore,
    updateStageInStore,
    addInitialTasks,
    addTaskToStore
} from '../taskSlice';
import { store } from '../../store';
import mockAxios from "jest-mock-axios";

///////////////////////////////////////////////////

// testing reducers

///////////////////////////////////////////////////

jest.mock('axios')

test('should return the initial state', () => {
    expect(reducer(undefined, {}))
        .toEqual({
            tasks: []
        });
});

test('should return one task with text "Go to work"', () => {
    const previousState = { tasks: [] };
    const newTasks = [
        {
            taskName: "daily plan",
            taskText: "Go to work",
            userId: "dangerousRat",
            stage: 1,
            __v: 0,
            _id: 'taskId',
        }
    ]

    expect(reducer(previousState, addInitialTasks(newTasks)).tasks[0].taskText)
        .toEqual("Go to work");
});

test(`should return a task with a text "buy some uranium" 
    and with a name "after work"`, () => {
    const previousState = { tasks: [] };
    const reducerData = {
        taskName: "after work",
        taskText: "buy some uranium",
        userId: "dangerousRat",
        stage: 2,
        __v: 0,
        _id: 'taskId',
    };

    expect(reducer(previousState, addTaskToStore(reducerData)).tasks[0].taskName)
        .toEqual("after work");

    expect(reducer(previousState, addTaskToStore(reducerData)).tasks[0].taskText)
        .toEqual("buy some uranium");
});

test('should update text of second task to "take a bath"', () => {
    const previousState = {
        tasks: [
            {
                taskName: "Hack Google",
                taskText: "Hack Google",
                userId: "dangerousRat",
                stage: 1,
                __v: 0,
                _id: 'taskId1',
            },
            {
                taskName: "main task today",
                taskText: "eat meat fit bleed",
                userId: "dangerousRat",
                stage: 1,
                __v: 0,
                _id: 'taskId2',
            }
        ]
    };
    const reducerData = {
        taskText: 'take a bath',
        _id: 'taskId2',
    }

    expect(reducer(previousState, updateTaskTextInStore(reducerData))
        .tasks[1]
        .taskText)
        .toEqual("take a bath");
});

test('should return empty array', () => {
    const previousState = {
        tasks: [
            {
                taskName: "main task today",
                taskText: "eat meat fit bleed",
                userId: "dangerousRat",
                stage: 1,
                __v: 0,
                _id: 'taskId2',
            }
        ]
    };
    const reducerData = 'taskId2';

    expect(reducer(previousState, deleteTaskFromStore(reducerData)))
        .toEqual({ tasks: [] })
});

test('should return initial task with a stage 3', () => {
    const previousState = {
        tasks: [
            {
                taskName: "main task today",
                taskText: "eat meat fit bleed",
                userId: "dangerousRat",
                stage: 1,
                __v: 0,
                _id: 'taskId2',
            }
        ]
    };
    const reducerData = { _id: 'taskId2', stage: 3 };

    expect(reducer(previousState, updateStageInStore(reducerData)).tasks[0].stage)
        .toEqual(3);
});

/////////////////////////////////////////////////

// testing extra reducers

////////////////////////////////////////////////
afterEach(() => {
    mockAxios.reset();
});

test('should return one task', async () => {
    const fakeTask = {
        taskName: "main task today",
        taskText: "eat meat fit bleed",
        userId: "dangerousRat",
        _id: 'taskId2',
        stage: 1,
        __v: 0,
    };
    mockAxios.get.mockResolvedValueOnce({ data: [fakeTask] });

    const state = await store.dispatch(fetchInitialTasks());
    expect(state.payload).toEqual([fakeTask]);
});

test('should add a task to an empty array', async () => {
    const fakeTask = {
        taskName: "main task today",
        taskText: "eat meat fit bleed",
        userId: "dangerousRat",
        _id: 'taskId2',
        stage: 1,
        __v: 0,
    };
    mockAxios.post.mockResolvedValueOnce({ data: { tasks: [fakeTask] } });

    const state = await store.dispatch(addTaskMiddleware(fakeTask));
    expect(state.payload.tasks).toEqual([fakeTask]);
});