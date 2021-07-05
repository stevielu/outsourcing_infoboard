/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {BasicModel} from './response'
interface RSIData {
  rtss:{
    description:Object;
    rtsId:string;
    signPos:{
      offsetLL:{
        position_LatLon:{
          lat:number;
          lon:number;
        }
      }
      offsetV:{
        elevation:number;
      }
    }
    signType:number;
  }[]
}
export interface RSIMessage{
  data:RSIData;
  device_id:string;
  time_stamp:number;
}
