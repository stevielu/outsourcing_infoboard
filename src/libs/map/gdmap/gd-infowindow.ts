/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import { Coordinates2D,Coordinate2DInvalid } from '../common';
import {MapInstance} from '../map-object';
import {InfoWindow} from '../map-marker'


export default class GDInfoWindow implements InfoWindow {
  private aMap:any
  AMapLib:any
  popWindow:any
  path:any[] = []
  map: MapInstance;
  extData?: any;

  private static instance: GDInfoWindow;//高德地图中的信息窗是一个全局对象，不可以实例化多个，否者会引用出错
  private _position:Coordinates2D = Coordinate2DInvalid

  set position(value:Coordinates2D){
    this._position = value
  }

  get position(){
    return this._position
  }

  constructor(map:MapInstance){
    this.aMap = map.originMapObject
    this.AMapLib =  map.originInstance
    this.map = map
    this.popWindow = new this.AMapLib.InfoWindow({
       offset: new this.AMapLib.Pixel(-15, -15),
       isCustom:true
    })
  }

  public static getInstance(map:MapInstance): GDInfoWindow {
      if (!GDInfoWindow.instance) {
          GDInfoWindow.instance = new GDInfoWindow(map);
      }

      return GDInfoWindow.instance;
  }

  public open = (position:Coordinates2D) => {
    this.popWindow.open(this.aMap,[position.longitude,position.lattitude])
  }

  create = (content:JSX.Element|HTMLElement|null,onOpen?:(context?:InfoWindow)=>void,onClose?:(context?:InfoWindow)=>void) => {
    this.popWindow.setContent(content)
  }

  close = () => {
    this.popWindow.close()
  };

  setContent = (content:JSX.Element|HTMLElement|null,onOpen?:(context?:InfoWindow)=>void,onClose?:(context?:InfoWindow)=>void) => {
    this.popWindow.setContent(content)
    this.popWindow.on('close',onClose)
    this.popWindow.on('open',onOpen)
  };
  setAnchor = () => {};



}
