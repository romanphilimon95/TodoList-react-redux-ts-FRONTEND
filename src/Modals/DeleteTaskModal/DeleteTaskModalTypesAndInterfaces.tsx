import { SetStateAction } from "react";

export type DeleteTaskModalPropsType = {
    setIsDeleteModalOpened: React.Dispatch<SetStateAction<boolean>>
    isDeleteModalOpened: boolean;
    _id: string;
}