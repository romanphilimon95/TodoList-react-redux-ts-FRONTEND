import { useState } from 'react';
// components
import { Button } from 'reactstrap';
import Task from '../Task/Task';
// types and interfaces
import { TaskInterface } from '../MainPage/MainPageTypesAndInterfaces';
import { MainPageColumnPropsType } from './MainPageColumnTypesAndInterfaces';
// other
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './MainPageColumn.scss';

const MainPageColumn = ({ 
    columnId,
    tasks, 
    name,
    i
}: MainPageColumnPropsType) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpanded = (): void => {
        return setIsExpanded(!isExpanded);
    }

    return (
        <>
            <div className="column-head">
                <h3 data-testid={`column-head-testid-${columnId}`}>
                    {name}
                </h3>
                <Button 
                    bssize="sm"
                    color="primary"
                    onClick={toggleExpanded}
                >
                    {
                        isExpanded
                        ? 'unexpand'
                        : 'expand'
                    }
                </Button>
            </div>
            <Droppable droppableId={columnId} key={i}>
                {(provided, snapshot) => {
                    return (
                    <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${isExpanded && 'expanded'} tasks`}
                        style={{
                            background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "white",
                            paddingBottom: snapshot.isDraggingOver
                            ? "70px"
                            : "0px"
                        }}
                    >
                        {tasks && tasks.map((task: TaskInterface, i: number) => {
                            return (
                                <Draggable key={task._id} draggableId={task._id} index={i}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: "none",
                                                    padding: 0.1,
                                                    backgroundColor: snapshot.isDragging
                                                    ? "lightgrey"
                                                    : "white",
                                                    color: "black",
                                                    ...provided.draggableProps.style
                                                }}
                                            >
                                                <Task 
                                                    key={task._id}
                                                    task={task}
                                                />
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            );
                        })}
                    </div>
                    )
                }
            }
            </Droppable>
        </>
    )
}

export default MainPageColumn;