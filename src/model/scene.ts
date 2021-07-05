export interface BasicV2X<T> {
  device_id:string;
  time_stamp:number;
  data:V2XScene|T
}
export interface PositionType  {
  alt:number;
  lon:number;
  lat:number;
};
export interface SecenType  {
  type:number;
  time:number;
  alam:number;
}
export interface V2XScene {
  position:PositionType
  [name:string]:SecenType|SecenType[]|PositionType;
}


export interface V2XSceneMerge{
  device_id:string;
  plate_number:string;
  scene:{
    [name:string]:{
      alam_num:number;
      alam_times:string[];
    }
  }
}
export type V2XSceneMergeList = V2XSceneMerge[]
