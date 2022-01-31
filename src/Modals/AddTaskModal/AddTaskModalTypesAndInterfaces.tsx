import { SetStateAction } from "react";

export type AddTaskModalPropsType = {
    setIsAddModalOpened: React.Dispatch<SetStateAction<boolean>>
    isAddModalOpened: boolean;
}