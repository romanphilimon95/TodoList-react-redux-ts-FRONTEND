import { useState, useEffect } from 'react';
// redux
import { 
    fetchInitialTasks, 
    updateStageMiddleware 
} from '../../redux/slices/taskSlice';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { denyAccess } from '../../redux/slices/isAuthSlice';
import { useSelector, useDispatch } from 'react-redux';
// components
import { Button } from 'reactstrap';
import MainPageColumn from '../MainPageColumn/MainPageColumn';
import AddTaskModal from '../../Modals/AddTaskModal/AddTaskModal';
// types and interfaces
import { RootStateType, AppDispatchType } from '../../redux/reduxTypes';
import { 
    TaskInterface,
    ColumnInterface, 
    OnDragEndInterface 
} from './MainPageTypesAndInterfaces';
// other
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import './MainPage.scss';
import { ServerUrl } from '../..';

const MainPage = () => {
    const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);

    const allTasks = useSelector((state: RootStateType) => state.tasks.tasks);
    const dispatch: AppDispatchType = useDispatch();

    const updateColumns = (): ColumnInterface[] => [
        {
            columnId: '0',
            name: 'Tasks',
            tasks: allTasks.filter(elem => elem.stage === 1),
        },
        {
            columnId: '1',
            name: 'In progress',
            tasks: allTasks.filter(elem => elem.stage === 2),
        },
        {
            columnId: '2',
            name: 'QA',
            tasks: allTasks.filter(elem => elem.stage === 3),
        },
        {
            columnId: '3',
            name: 'Finished',
            tasks: allTasks.filter(elem => elem.stage === 4),
        },
    ];

    const [columns, setColumns] = useState<ColumnInterface[]>(updateColumns());

    useEffect(():void => {
        const getAllTasks = async (): Promise<void> => {
            try {
                dispatch(fetchInitialTasks());
            } catch (e) {
                dispatch(setAlert(e.message));
                dispatch(denyAccess());
                localStorage.clear();
            };
        }

        getAllTasks();
        setColumns(updateColumns());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect((): void => {
        setColumns(updateColumns())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTasks]);

    const logout = async (): Promise<void> => {
        try {
            const url: string = `${ServerUrl}/logout`;
            await axios.get<never, never>(url,
                {
                    withCredentials: true,
                    credentials: 'include'
                })
                .then((): void => {
                    dispatch(denyAccess());
                    localStorage.clear();
                })
        } catch (e) {
            dispatch(setAlert(e.message));
        };
    }

    const onDragEnd = (result: OnDragEndInterface): void => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const items = Array.from(columns);
            const [reorderedItem]: TaskInterface[] = items[source.droppableId].tasks.splice(source.index, 1);
            items[source.droppableId].tasks.splice(destination.index, 0, reorderedItem);
            setColumns(items);

        } else {
            const sourceColumn: ColumnInterface = columns[source.droppableId];
            const destColumn: ColumnInterface = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.tasks];
            const destItems = [...destColumn.tasks];
            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);
            const newArr = [...columns];
            newArr[destination.droppableId] = { ...destColumn, tasks: destItems };
            newArr[source.droppableId] = { ...sourceColumn, tasks: sourceItems };

            setColumns([
                ...newArr
            ]);

            dispatch(updateStageMiddleware({ stage: Number(destination.droppableId) + 1, _id: draggableId }))
        }
    }

    return (
        <div className="mainpage-wrapper">
            <div className="header-wrapper">
                <h1>
                    To-Do list
                </h1>
                <Button
                    data-testid="logout-button-testid"
                    color="secondary"
                    bssize="lg"
                    onClick={logout}
                >
                    Log out
                </Button>
            </div>
            <Button
                data-testid="add-task-button-testid"
                color="primary"
                bssize="lg"
                onClick={() => setIsAddModalOpened(true)}
            >
                Add new task
            </Button>
            <div className="mainpage-columns-wrapper">
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {columns.map(({ columnId, name, tasks }, i) => {
                        return (
                            <div 
                                data-testid={`testid-${columnId}`}
                                className="mainpage-column"
                                key={columnId} 
                            >
                                <MainPageColumn
                                    columnId={columnId}
                                    tasks={tasks}
                                    name={name}
                                    i={i}
                                />
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
            {
                isAddModalOpened &&
                <AddTaskModal
                    isAddModalOpened={isAddModalOpened}
                    setIsAddModalOpened={setIsAddModalOpened}
                />
            }
        </div>
    )
}

export default MainPage;