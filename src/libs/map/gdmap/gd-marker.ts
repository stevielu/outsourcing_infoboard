/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import Marker,{InfoWindow} from '../map-marker'
import {MapInstance} from '../map-object';
import { Coordinates2D,Coordinate2DInvalid,MarkerIcon,ZoomValue } from '../common';
import {Size} from '../../base/common'

import GDInfoWindow from './gd-infowindow'
import Stringify from '../../../utils/stringify'
import Logger from '../../../utils/logger'
import GDUtils from './gd-utils'



const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;
const VERSION2 = '2.0'

class GDMarker implements Marker {
  map: MapInstance|null = null;
  id?: string | undefined;

  title?: string | undefined = '';
  anchor?: string | number | undefined;
  icon?:MarkerIcon;
  render?:JSX.Element;
  rotation?: number | undefined;
  draggable?: boolean | undefined = false;
  extra?: any;
  offset?:{x:number;y:number;}
  originMarker: any;
  onClick?:(e:any) => void
  infoWindow?:InfoWindow
  infoContent?:JSX.Element|HTMLElement|null;

  private _zoom:number = ZoomValue.Small;
  private _AMap:any|null = null;//高德地图基础类
  private log = Logger('GDMarker')
  private _position: Coordinates2D = Coordinate2DInvalid;

  set position(value:Coordinates2D){
    this._position = value
  }
  get position(){
    return this._position
  }

  public constructor(init:Partial<GDMarker>) {
    Object.assign(this, init);
    this._AMap = this.map && this.map.originInstance

    if(this._AMap && this.map){
      let newIcon,markerContent
      if(this.icon){
          newIcon = this._buildIcon(
          this.icon.url,
          this.icon.size ? this.icon.size : {width:50,height:50},
          this.icon.offset ? this.icon.offset : {width:0,height:0}
        )

      }else if(this.render){
        markerContent = Stringify.JSXToString(this.render)
      }

      const offset  = this.offset ? (this.offset):{x:0,y:0}
      let marker = new this._AMap.Marker({
          position:[this.position.longitude,this.position.lattitude] ,
          title: this.title,
          icon:newIcon,
          content:markerContent,
          offset: new this._AMap.Pixel(offset.x,offset.y),
          zoom: this._zoom
      })
      this.infoWindow =  GDInfoWindow.getInstance(this.map)
      marker.extData = this.extra
      marker.on('click', this.mouseClick);
      this.originMarker = marker

    }
  }

  public setIcon =  (content:JSX.Element) => {
    if(content){
      this.originMarker.setContent(Stringify.JSXToString(content))
    }
  }

  public setPositions = (longtitude:number,lattitude:number) => {
    if(Number.isNaN(longtitude) || Number.isNaN(lattitude)){
      this.log.error('invalid coordinates...')
      return
    }
    this.position = {longitude:longtitude,lattitude:lattitude}
    this.originMarker.setPosition([this.position.longitude,this.position.lattitude])
  }

  public setAngle = (angle:number) => {
    this.originMarker.setAngle(angle)
  }

  public setLabel = (content:JSX.Element,anchor?:string) => {
    this.originMarker.setLabel({
        direction:anchor ? anchor:'top',
        content: Stringify.JSXToString(content), //设置文本标注内容
        offset: new this._AMap.Pixel(-5, -5),
    });
  }

  public setAnchor = (value: string | number) => {
    this.originMarker.setAnchor(value)
  }

  public hide = () => {

  }

  public show = () => {

  }


  public mouseClick = () => {
    if(this.onClick){
      this.onClick(this)
    }
  }

  public getInstance = () =>{
    return this.originMarker
  }

  public moveTo = (pathData:{longitude:number,lattitude:number}[],duration:number,complete?:(e:any) => void,animationCallBack?:(e:any) => void) => {
    let totalPath = pathData.map(item => {
      return [item.longitude,item.lattitude]
    })


    this._stratMoveSignle(totalPath,duration)


    // 缓冲播放
    // this._stratMove(totalPath,duration,() => {
    //   if(complete){
    //     complete(this)
    //   }
    //
    // },(index:number)=>{
    //   if(animationCallBack){
    //     animationCallBack(index)
    //   }
    // },totalPath.length)

  }

  private _stratMove = (target:number[][],duration:number,complete:()=> void,animationCallback:(index:number)=>void,originLen:number) => {
    let newPath = target
    if(newPath.length > 0){
      const currentPath = newPath[0]

      const playingTime = window.setTimeout(() =>{
        newPath.shift()
        clearTimeout(playingTime)
        animationCallback(originLen - newPath.length)
        this._stratMove(newPath,duration,complete,animationCallback,originLen)
      },duration);

      this.originMarker.moveTo(currentPath, {
          // 每一段的时长
          duration: duration,
          // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
          autoRotation: false,
      });
    }

    if(newPath.length === 0){
      complete()
    }
    return newPath.length
  }


  private _stratMoveSignle = (target:number[][],duration:number) => {
    if(this.map && this.map.version == VERSION2){
      this.originMarker.moveTo(target[0], {
          // 每一段的时长
          duration: duration,
          // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
          autoRotation: false,
      });
    }else{
      const lnglat = new this._AMap.LngLat(target[0][0],target[0][1])
      this.originMarker.moveTo(lnglat, duration);
    }

  }



  private _buildIcon = (imgUrl:string,size:Size,offset:Size) => {
    var icon = new this._AMap.Icon({
      size: new this._AMap.Size(size.width, size.height),    // 图标尺寸
      image: imgUrl,  // Icon的图像
      imageOffset: new this._AMap.Pixel(offset.width, offset.height),  // 图像相对展示区域的偏移量，适于雪碧图等
    })
    return icon
  }
}

export default GDMarker
