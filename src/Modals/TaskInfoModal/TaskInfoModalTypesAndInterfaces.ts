import { SetStateAction } from "react";
import { TaskInterface } from '../../components/MainPage/MainPageTypesAndInterfaces';

export interface CommentInterface {
    author: string;
    commentText: string;
    date: string;
    taskId: string;
    __v: number;
    _id: string;
}

export interface PostCommentInterface {
    commentText: string;
    date: string;
    taskId: string;
}

export type TaskInfoModalPropsType = {
    setIsTaskInfoModalOpened: React.Dispatch<SetStateAction<boolean>>
    isTaskInfoModalOpened: boolean;
    task: TaskInterface;
}