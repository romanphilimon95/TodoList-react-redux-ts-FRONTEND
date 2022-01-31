import { Combine } from "react-beautiful-dnd";

export interface ColumnInterface {
    columnId: string;
    name: string;
    tasks: TaskInterface[];
}

export interface OnDragEndInterface {
    combine?: Combine;
    destination?: {
        droppableId: string;
        index: number;
    };
    draggableId: string;
    mode: string;
    reason: string;
    source: {
        droppableId: string;
        index: number;
    };
    type: string;    
}

export interface TaskInterface {
    taskName: string;
    taskText: string;
    userId: string;
    stage: number;
    __v: number;
    _id: string;
}