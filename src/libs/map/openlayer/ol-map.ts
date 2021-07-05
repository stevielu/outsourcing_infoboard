/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {TileWMS} from 'ol/source'
import OSM from 'ol/source/OSM';
import {transform} from 'ol/proj'
import {MousePosition} from 'ol/control'

import MapInterface from '../map-core'
import Marker from '../map-marker'
import CanvasLayer from '../map-canvaslayer'
import MapUtils from '../map-utils'
import { MapInstance} from '../map-object'
import {Coordinates2D,MapType,HeatMapData,WMSProtocol,ThreeDimension} from '../common'
import Logger from '../../../utils/logger'
import UUID from '../../../utils/uuid'



class OLMap implements MapInterface {
  map: MapInstance;
  version:string = ''
  protocol:string;
  options?:object;//初始化参数，zoom，plugin，center，layer etc
  token: string | number = '';
  loadState:boolean = false
  utils?:MapUtils

  private _markers:{[name:string]:Marker} = {}
  private _olMap?:Map
  private _canvasStarted = false
  private log = Logger('OLMap')
  private _heatMap:any = null
  private _3Dlayer:{[name:string]:any} = {}
  private _3DObject:{[name:string]:any} = {}
  private _onRendered?:()=>{}
  constructor(ver?:string,options?:{}){
    if(ver){
       this.version = ver
    }


    this.options = options
    this.protocol = window.location.protocol
    if (this.protocol.indexOf(':') === -1) {
      this.protocol += ':'
    }

    this.map = new MapInstance(MapType.OpenLayers)

    this.map.id = UUID.get()
    this.map.version = this.version


  }



 public get center():Coordinates2D  {
  return this.center
 }
 public set center(value:Coordinates2D) {
   this.center = value
 }


  // 创建单个地图实例，随组件一起销毁
  public createInstance = (wrapper:HTMLDivElement,center?:Coordinates2D,zoom?:number,id?:string) => {

    return new Promise<boolean>((reslove,reject) => {
      const olmap = new Map({
          view: new View({
            center: center ? transform([center.longitude,center.lattitude],'EPSG:4326','EPSG:3857'):[0, 0],
            zoom: zoom?zoom:16,
          }),
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          controls:[],

          target: wrapper
      })
      if(olmap){


        this.map.originInstance = olmap
        this._olMap = olmap
        olmap.once('rendercomplete',(event) => {
          this.loadState = true
          if(this._loadEvent){
            this._loadEvent()
          }
        })

        olmap.on('singleclick',(event) => {
          console.log(event.coordinate);
        })
        reslove(true)
      }else{
        reject(false)
      }
    })


  }

  private _loadEvent?:()=>void
  private _onRenderComplete = (listenerFn:()=>void) => {
    this._loadEvent = listenerFn
  }
  // 地图图块加载完成后触发
  public onload = () => {
    return new Promise<MapInstance>((resolve) =>{
      this._olMap?.once('rendercomplete',(event) => {
        resolve(this.map)
      })
      this._onRenderComplete(()=>{
        if(this._olMap){
          this._olMap.updateSize()
        }
      })
    })
  }

  //添加标记
  public addMarker = (marker:Marker) => {


  }

  public removeMarker = (marker:Marker) => {

  }

  public getMarkers = (id:string)=>{
    return this._markers[id];
  }

  //移动地图
  public moveTo = (position:Coordinates2D) => {


  }

  //设置旋转地图
  public setRotation = (degree?:number) => {

  }

  public addCanvasLayer = (canvas:HTMLCanvasElement,drawer?:()=>void) =>{
    return undefined
  }

  removeCanvasLayer = (layer:CanvasLayer) => {

  };

  public addTileLayer = (tileUrl:string,params:WMSProtocol|WMSProtocol[],zIndex?:number) => {

    const wms = new TileLayer({
        source: new TileWMS({
            url: tileUrl,
            params: {...params,'TILED':true},
            serverType: "geoserver",
        }),
        zIndex:999
    });
    if(this._olMap){
      console.log(params)
      this._olMap.addLayer(wms)
    }

    return wms;
  }

  public addHeatMapData = (data:HeatMapData) => {
    this._setHeatmapData(data)

  }


  public addEventListener = (event:string,handle:(e:MapInterface)=>void) => {

  };
  public removeEventListener = (event:string,handle:(e:MapInterface)=>void) => {

  };

  public addMenu = (name:string,index:number,handle:(e:MapInterface,context?:any)=>void,onOpen?:(e:{pos:Coordinates2D})=>void,extra?:any)=>{

  }

  public setZoom = (zoom:Number) =>{


  }

  public getZoom = ()=>{
    return 0
  }


  public searchDrivingPath = (dst: Coordinates2D, ori: Coordinates2D) => {
    return new Promise<any>(resolve => {resolve()})
  }

  public searchWalkingPath = (dst: Coordinates2D, ori: Coordinates2D) => {
    return new Promise<any>(resolve => {resolve()})
  }


  private _setHeatmapData = (data:HeatMapData) =>{

  }

  public add3DModel(options:ThreeDimension,id?:string){


  }

  private _add3DTiles(options:ThreeDimension){

  }

  private _addGltfModel(params:ThreeDimension){

  }

  public set3DModelOption(key:string,options:{position:Coordinates2D;scale:number;height:number}){

  }

}
export default OLMap
