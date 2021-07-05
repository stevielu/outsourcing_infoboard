/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {MapInstance} from './map-object'
import {Coordinates2D,HeatMapData,WMSProtocol,ThreeDimension} from './common'
import MarkerInterface from './map-marker'
import CanvasLayer from './map-canvaslayer'
import MapUtils from './map-utils'


interface MapInterface{
  map:MapInstance;
  token:string | number;
  loadState:boolean;
  createInstance: (wrapper:HTMLDivElement,center?:Coordinates2D,zoom?:number,id?:string) => Promise<boolean>;
  center?:Coordinates2D;
  onload:() => Promise<MapInstance>;
  moveTo:(position:Coordinates2D) => void;
  setRotation:(degree?:number) => void;
  addMarker:(marker:MarkerInterface) => void;
  getMarkers:(id:string) => MarkerInterface|undefined;
  removeMarker:(marker:MarkerInterface) => void;
  addCanvasLayer:(canvas:HTMLCanvasElement,drawer?:()=>void) => CanvasLayer|undefined;
  removeCanvasLayer:(layer:CanvasLayer) => void;
  addTileLayer:(tileUrl:string,params:WMSProtocol|WMSProtocol[],zIndex?:number) => void;
  addHeatMapData:(data:HeatMapData) => void;
  setZoom:(zoom:Number)=>void;
  getZoom:()=>number;
  addEventListener:(event:string,handle:(e:MapInterface)=>void) => void;
  removeEventListener:(event:string,handle:(e:MapInterface)=>void)=> void;
  add3DModel:(options:ThreeDimension,id?:string)=> void;
  set3DModelOption?:(key:string,options:{position:Coordinates2D;scale:number;height:number}) => void;
  searchDrivingPath:(dst:Coordinates2D,ori:Coordinates2D) => Promise<any>;
  searchWalkingPath:(dst:Coordinates2D,ori:Coordinates2D) => Promise<any>;
  utils?:MapUtils;
}

export default MapInterface
