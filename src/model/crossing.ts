/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {BasicModel} from './response'

export interface CrossingNumber{
  id:string;
  intersNo:string;
}

export interface LampConfig{
  angle:number;
  entryDirection:string;
  id:string;
  lampPhaseList:{
    lampType:string;
    phase:number;
  }[];
  latitude:number;
  longitude:number;
  seqNo:number
}

export interface CrossingConfig{
  id:string;
  intersNo:string;
  phaseList:number[];
  signalConfList:LampConfig[];
}
