import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
// redux
import { fetchInitialTasks } from '../../redux/slices/taskSlice';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
// jest
import mockAxios from 'jest-mock-axios';
import '@testing-library/jest-dom';

const tasks = [
    {
        taskName: 'wash a car',
        taskText: "I should wash a car because it's a quite dirty",
        userId: 'myId',
        stage: 1,
        __v: 0,
        _id: '123qwe123qwe'
    },
    {
        taskName: 'wash teeth',
        taskText: "I should wash my teeth because I have to do it every day",
        userId: 'myId',
        stage: 3,
        __v: 0,
        _id: '234wer234wer'
    },
    {
        taskName: 'drink a coffee',
        taskText: "I should drink a coffee because it gives me energy",
        userId: 'myId',
        stage: 2,
        __v: 0,
        _id: '345ert345ert'
    },
];


test('should render 4 columns', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: tasks });
    await store.dispatch(fetchInitialTasks());

    render(
        <Provider store={store}>
            <MainPage />
        </Provider>
    );

    const columnOne = screen.getByTestId('testid-0');
    const columnTwo = screen.getByTestId('testid-1');
    const columnThree = screen.getByTestId('testid-2');
    const columnFour = screen.getByTestId('testid-3');

    expect(columnOne).toBeInTheDocument();
    expect(columnTwo).toBeInTheDocument();
    expect(columnThree).toBeInTheDocument();
    expect(columnFour).toBeInTheDocument();
});

test('logout button should have secondary class', () => {
    render(
        <Provider store={store}>
            <MainPage />
        </Provider>
    );

    const button = screen.getByTestId('logout-button-testid');

    expect(button).toHaveClass('btn-secondary');
});

test('add task button should have primary class', () => {
    render(
        <Provider store={store}>
            <MainPage />
        </Provider>
    );

    const button = screen.getByTestId('add-task-button-testid');

    expect(button).toHaveClass('btn-primary');
});

test('column headers should have text "Tasks", "In progress", "QA", "Finished"', () => {
    render(
        <Provider store={store}>
            <MainPage />
        </Provider>
    );

    const columnHeaderOne = screen.getByTestId(`column-head-testid-0`);
    const columnHeaderTwo = screen.getByTestId(`column-head-testid-1`);
    const columnHeaderThree = screen.getByTestId(`column-head-testid-2`);
    const columnHeaderFour = screen.getByTestId(`column-head-testid-3`);

    expect(columnHeaderOne).toHaveTextContent("Tasks");
    expect(columnHeaderTwo).toHaveTextContent("In progress");
    expect(columnHeaderThree).toHaveTextContent("QA");
    expect(columnHeaderFour).toHaveTextContent("Finished");
});

test('should render "wash teeth" task in the third column', () => {
    render(
        <Provider store={store}>
            <MainPage />
        </Provider>
    );

    const targetColumn = screen.getByTestId(`testid-2`);
    const targetTask = screen.getByTestId('task-testid-234wer234wer');

    expect(targetColumn).toContainElement(targetTask);
});