/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {Size} from '../base/common'
export type Coordinates2D = {
  lattitude:number;
  longitude:number;
}

export const Coordinate2DInvalid = {
  lattitude:0,
  longitude:0
} as Coordinates2D

export type PixelValue = {
  x:number;
  y:number;
}

export interface MarkerIcon {
  url: string;
  size?: Size;
  offset?:Size;
  opts?: any;
}

export enum OverlayZindex {
  Low = 1,
  Medium = 99,
  Upper = 999
}

export enum ZoomValue {
  Tiny = 1,
  Small = 12,
  MediumSamll = 15,
  MediumLarge = 16,
  Large = 18,
  Huge = 23
}

export type HeatMapValue = {
  position:Coordinates2D;
	count:number;
  max?:number;
}
export type HeatMapData = HeatMapValue[]



export type WMSProtocol = {
  LAYERS: string|string[],
  VERSION?: string,
  STYLES?: string,
  SRS?:string,
  TRANSPARENT?:boolean,
  FORMAT?:string,
  REQUEST?:string,
}// OGC标准的WMS地图服务的GetMap接口的参数

export type ThreeDimension = {
  tileUrl?:string,
  gltf?:string,
  obj?:string,
  mtl?:string,
  rotate:number,
  option:{
    position:Coordinates2D;
    scale:number;
    height:number;
    scene?:number;
  }
}

export enum MapType{
  Google = 'Google',
  Baidu = 'Baidu',
  Gaode = 'Gaode',
  OpenLayers = 'OpenLayers',
  Undefined = 'Undefined'
}
