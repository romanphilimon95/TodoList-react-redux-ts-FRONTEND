import { useState as useStateMock } from 'react';
import DeleteTaskModal from './DeleteTaskModal';
// redux
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
// jest & @testing-library/react
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

const setState = jest.fn();

beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
});

test('delete modal should be in document', () => {
    render(
        <Provider store={store}>
            <DeleteTaskModal 
                setIsDeleteModalOpened={setState}
                isDeleteModalOpened={true}  
            />
        </Provider>
    )

    const deleteModal = screen.getByTestId('delete-modal-testid');

    expect(deleteModal).toBeInTheDocument();
});

test("delete modal shouldn't be in document", () => {
    render(
        <Provider store={store}>
            <div data-testid="wrapper">
                <DeleteTaskModal 
                    setIsDeleteModalOpened={setState}
                    isDeleteModalOpened={false}  
                />
            </div>
        </Provider>
    )

    const wrapper = screen.getByTestId('wrapper');

    expect(wrapper).toBeEmptyDOMElement();
});