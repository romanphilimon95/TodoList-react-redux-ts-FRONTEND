import { useState } from 'react';
// icons
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
// components
import TaskInfoModal from '../../Modals/TaskInfoModal/TaskInfoModal';
import DeleteTaskModal from '../../Modals/DeleteTaskModal/DeleteTaskModal';
import UpdateTaskModal from '../../Modals/UpdateTaskModal/UpdateTaskModal';
// typescript stuff
import { TaskInterface } from '../MainPage/MainPageTypesAndInterfaces';
//other
import './Task.scss';

const Task = ({ task }: { task: TaskInterface }) => {
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);
    const [isTaskInfoModalOpened, setIsTaskInfoModalOpened] = useState<boolean>(false);
    const { taskName, _id } = task;

    return (
        <div className="task" data-testid={`task-testid-${_id}`}>
            <div 
                className="taskName" 
                onClick={() => setIsTaskInfoModalOpened(true)}
            >
                <h6 data-testid="h6">
                    {taskName}
                </h6>
            </div>
            <div className="icons">
                <div 
                    className="icon"
                    onClick={() => setIsUpdateModalOpened(true)}
                >
                    <BsFillPencilFill />
                </div>
                <div 
                    className="icon"
                    onClick={() => setIsDeleteModalOpened(true)}
                >
                    <BsTrashFill />
                </div>
            </div>
            {isDeleteModalOpened &&
                <DeleteTaskModal
                    setIsDeleteModalOpened={setIsDeleteModalOpened}
                    isDeleteModalOpened={isDeleteModalOpened}
                    _id={_id}
                />
            }
            {isUpdateModalOpened &&
                <UpdateTaskModal
                    setIsUpdateModalOpened={setIsUpdateModalOpened}
                    isUpdateModalOpened={isUpdateModalOpened}
                    task={task}
                />
            }
            {isTaskInfoModalOpened &&
                <TaskInfoModal 
                    setIsTaskInfoModalOpened={setIsTaskInfoModalOpened}
                    isTaskInfoModalOpened={isTaskInfoModalOpened}
                    task={task}
                />
            }
        </div>
    )
}

export default Task;