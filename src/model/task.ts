import {BasicModel, PageObj} from './response'
export interface TaskInfo extends BasicModel{
    id:string;
    taskId?:number;
    vid:number;
    name:string;
    type:string;
    status:number;
    version:number;
}

export interface detailData{
    id:string;
    name:string;
    activityExecutionList: {
        id:string;
        name:string;
        status:number
    }[];
}

export type detailDataList = detailData[]

