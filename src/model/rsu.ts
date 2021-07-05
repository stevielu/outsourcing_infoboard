/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {BasicModel} from './response'
type LampPhaseValue = {
  id:number;
  light:string;
  likelyEndTime:number;
}

export interface RSUSpat{
  device_id:string;
  intersection_id:string;
  phases:LampPhaseValue[];
  time_stamp:number;
}

export interface Camera{
  id:string;
  latitude:number;
  longitude:number;
  url:string;
  name:string
}
