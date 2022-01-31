import {
    ModalFooter,
    ModalHeader,
    Button,
    Modal
} from 'reactstrap';
//redux
import { deleteTaskMiddleware } from '../../redux/slices/taskSlice';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { useDispatch } from 'react-redux';
// types and interfaces
import { DeleteTaskModalPropsType } from './DeleteTaskModalTypesAndInterfaces';
import { AppDispatchType } from '../../redux/reduxTypes';

const DeleteTaskModal = ({
    setIsDeleteModalOpened,
    isDeleteModalOpened,
    _id
}: DeleteTaskModalPropsType) => {
    const dispatch: AppDispatchType = useDispatch();

    const deleteTask = async (): Promise<void> => {
        dispatch(deleteTaskMiddleware(_id))
            .then(() => {
                setIsDeleteModalOpened(false);
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
            data-testid="delete-modal-testid"
            isOpen={isDeleteModalOpened}
            centered
            bssize=""
            toggle={() => setIsDeleteModalOpened(false)}
        >
            <ModalHeader>
                Do you really want to delete this task?
            </ModalHeader>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={deleteTask}
                >
                    Delete
                </Button>
                <Button onClick={() => setIsDeleteModalOpened(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteTaskModal;