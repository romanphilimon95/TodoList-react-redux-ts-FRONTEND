import { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import AddTaskModal from './AddTaskModal';
// redux
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
// jest
import '@testing-library/jest-dom';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

const setState = jest.fn();

beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
})

test('add modal should be in document', () => {
    render(
        <Provider store={store}>
            <AddTaskModal 
                isAddModalOpened={true} 
                setIsAddModalOpened={setState} 
            />
        </Provider>
    )

    const addModal = screen.getByTestId('add-modal-testid');

    expect(addModal).toBeInTheDocument();
});

test("add modal shouldn't be in document", () => {
    render(
        <Provider store={store}>
            <div data-testid="modal-wrapper-testid">
                <AddTaskModal 
                    isAddModalOpened={false} 
                    setIsAddModalOpened={setState} 
                />
            </div>
        </Provider>
    )

    const wrapper = screen.getByTestId("modal-wrapper-testid");

    expect(wrapper).toBeEmptyDOMElement();
});