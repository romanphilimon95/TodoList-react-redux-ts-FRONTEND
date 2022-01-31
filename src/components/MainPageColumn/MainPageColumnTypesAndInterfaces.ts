import { TaskInterface } from "../../redux/reduxTypes"

export type MainPageColumnPropsType = {
    columnId: string;
    tasks: TaskInterface[];
    name: string;
    i: number;
}
