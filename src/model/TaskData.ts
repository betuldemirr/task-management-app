import {Comment} from "./Comment";

export interface TaskData {
    id: string;
    title: string;
    description: string;
    comments: Comment[];
}