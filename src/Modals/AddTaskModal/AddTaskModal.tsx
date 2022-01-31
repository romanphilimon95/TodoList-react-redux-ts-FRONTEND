import { useState } from 'react';
//components
import {
    ModalFooter,
    ModalHeader,
    ModalBody,
    Button,
    Input,
    Modal,
    Label
} from 'reactstrap';
// redux
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { addTaskMiddleware } from '../../redux/slices/taskSlice';
import { useDispatch } from 'react-redux';
// types and interfaces
import { AddTaskModalPropsType } from './AddTaskModalTypesAndInterfaces';
import { AppDispatchType } from '../../redux/reduxTypes';

const AddTaskModal = ({ 
    setIsAddModalOpened, 
    isAddModalOpened, 
}: AddTaskModalPropsType) => {
    const dispatch: AppDispatchType = useDispatch();
    const [taskText, setTaskText] = useState('');
    const [taskName, setTaskName] = useState('');

    const addTask = async (): Promise<void> => {
        dispatch(addTaskMiddleware({ 
            taskText, 
            taskName, 
            stage: 1 
        }))
            .then(() => {
                setTaskText('');
                setIsAddModalOpened(false);
            })
            .catch(e => {
                dispatch(setAlert({
                    alertData: {
                      text: e.message,
                      isOpened: true
                    }
                  }));
            });
    }

    return (
            <Modal
                data-testid="add-modal-testid"
                isOpen={isAddModalOpened}
                centered
                bssize=""
                toggle={() => setIsAddModalOpened(false)}
            >
                <ModalHeader toggle={() => setIsAddModalOpened(false)}>
                    Add new task
                </ModalHeader>
                <ModalBody>
                    <Label for="printName">
                        Name a task
                    </Label>
                    <Input
                        id="printName"
                        name="printName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.currentTarget.value)}
                    />
                    <Label for="exampleText">
                        Print a description
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        value={taskText}
                        onChange={(e) => setTaskText(e.currentTarget.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={addTask}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setIsAddModalOpened(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    )
}

export default AddTaskModal;