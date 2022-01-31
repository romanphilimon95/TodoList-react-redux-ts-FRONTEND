import { SetStateAction } from "react"
import { CommentInterface } from "../../Modals/TaskInfoModal/TaskInfoModalTypesAndInterfaces"

export type CommentPropsType = {
    comment: CommentInterface;
    allComments: CommentInterface[];
    setAllComments: React.Dispatch<SetStateAction<CommentInterface[]>>
}