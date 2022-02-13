import { SetStateAction } from "react";
import { TaskInterface } from '../../components/MainPage/MainPageTypesAndInterfaces';

export type UpdateTaskModalPropsType = {
    setIsUpdateModalOpened: React.Dispatch<SetStateAction<boolean>>
    isUpdateModalOpened: boolean;
    task: TaskInterface;
}