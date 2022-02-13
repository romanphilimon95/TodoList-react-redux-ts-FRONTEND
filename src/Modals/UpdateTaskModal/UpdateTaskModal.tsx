import { useState } from 'react';
// components
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
import { updateTaskMiddleware } from '../../redux/slices/taskSlice';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { useDispatch } from 'react-redux';
// types and interfaces
import { UpdateTaskModalPropsType } from './UpdateTaskModalTypesAndInterfaces';
import { AppDispatchType } from '../../redux/reduxTypes';

const UpdateTaskModal = ({
    setIsUpdateModalOpened,
    isUpdateModalOpened,
    task
}: UpdateTaskModalPropsType) => {
    const { taskText, _id } = task;
    const dispatch: AppDispatchType = useDispatch();

    const [modalTaskText, setModalTaskText] = useState(taskText);

    const updateTaskText = async (): Promise<void> => { 
        dispatch(updateTaskMiddleware({ taskText: modalTaskText, _id }))
            .then(() => {
                setIsUpdateModalOpened(false);
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
        <div>
            <Modal
                isOpen={isUpdateModalOpened}
                centered
                bssize=""
                toggle={() => setIsUpdateModalOpened(false)}
            >
                <ModalHeader toggle={() => setIsUpdateModalOpened(false)}>
                    Update a task
                </ModalHeader>
                <ModalBody>
                    <Label for="exampleText">
                        Edit the description
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        value={modalTaskText}
                        onChange={(e) => setModalTaskText(e.currentTarget.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={updateTaskText}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setIsUpdateModalOpened(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdateTaskModal;