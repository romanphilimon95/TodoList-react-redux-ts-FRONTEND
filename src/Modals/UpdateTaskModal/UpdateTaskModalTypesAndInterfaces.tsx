import { SetStateAction } from "react";
import { TaskInterface } from "../../redux/reduxTypes";

export type UpdateTaskModalPropsType = {
    setIsUpdateModalOpened: React.Dispatch<SetStateAction<boolean>>
    isUpdateModalOpened: boolean;
    task: TaskInterface;
}