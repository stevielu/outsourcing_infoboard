/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {VectorOverlay,Shape,PolyLine,Polygon,PolyLineOpts,PolygonOpts,LineStyle} from '../map-vector'
import { Coordinates2D } from '../common';
import {MapInstance} from '../map-object';
import MapInterface from '../map-core';
/*****************
  基类
*****************/
class GDBaseVector {
  map:MapInterface
  amap:any
  AMapLib:any
  path:Coordinates2D[] = []
  extra?:Object
  overlay?:any
  constructor(mapObject:MapInterface,path:Coordinates2D[]){
    this.map = mapObject
    this.amap = mapObject.map.originMapObject
    this.AMapLib =  mapObject.map.originInstance
    this.path = this.formatedPathValue(path)
  }


  public formatedCoordinatesValue = (point:Coordinates2D) => {
    return new this.AMapLib.LngLat(point.longitude,point.lattitude)
  }

  public formatedPathValue = (path:Coordinates2D[]) => {
    if(path.length > 0){
      return path.map(item => {
        return this.formatedCoordinatesValue(item)
      })
    }else{
      return []
    }
  }

  setPath = (path:Coordinates2D[]) => {

  }

  show = () => {

  };

  hide = () => {

  };

  remove = () => {
    if(this.overlay){
      this.amap.remove(this.overlay)
    }
    return false
  }
}

/*****************
  折线
*****************/
export class GDPolyLine extends GDBaseVector implements PolyLine {
  polyline:any

  constructor(map:MapInterface,path:Coordinates2D[],style?:PolyLineOpts){
    super(map,path)
    if(this.path){
      this.polyline = new this.AMapLib.Polyline({
        path: this.path,
        strokeWeight: style ? style.width:2, // 线条宽度，默认为 2
        strokeColor:style ? style.color:'red',
        lineJoin: 'round', // 默认折线拐点连接处样式
        showDir:style ? style.showArrow:false,
        strokeStyle:style ? (style.lineStyle == LineStyle.Dashed) ? 'dashed':'solid':'solid'
      });
      //add
      this.polyline.setMap(this.amap)
      this.setPath(this.path)
      this.overlay = this.polyline
    }else{
      console.log('add polyline error,invalid path parameters')
    }

  }



  setStyle = (opts: PolyLineOpts) => {
    this.polyline.setOptions({
      strokeOpacity:1,
      strokeWeight: opts ? opts.width:2, // 线条宽度，默认为 2
      strokeColor:opts ? opts.color:'red',
      lineJoin: 'round', // 默认折线拐点连接处样式
      showDir:opts ? opts.showArrow:false,
      strokeStyle:opts ? (opts.lineStyle == LineStyle.Dashed) ? 'dashed':'solid':'solid'
    })
  };

  addEvent = (event:string,callback:(map:MapInterface,shapeObj:PolyLine)=>void) => {
    this.polyline.on(event,(e:any)=>{
      callback(this.map,this)
    },this)
  }

  removeEvent = (event:string) =>{
    this.polyline.clearEvents(event)
  }
}


/*****************
  多边形
*****************/
export class GDPolygon extends GDBaseVector implements Polygon {
  polygon:any

  constructor(map:MapInterface,path:Coordinates2D[],style?:PolygonOpts){
    super(map,path)
    if(this.path){
      this.polygon = new this.AMapLib.Polygon({
        path: this.path,
        strokeWeight: style ? style.width:2, // 线条宽度，默认为 2
        strokeColor:style ? style.color:'red',
        fillColor:style ? style.fillColor ? style.fillColor:style.color:'transparent',
        fillOpacity:style ? style.fillOpacity:1,
        strokeStyle:style ? (style.lineStyle == LineStyle.Dashed) ? 'dashed':'solid':'solid'
      });
      //add
      this.polygon.setMap(this.amap)
      this.amap.setFitView([ this.polygon ])
      this.overlay = this.polygon
    }else{
      console.log('add polygon error,invalid path parameters')
    }

  }



  setStyle = (opts: PolygonOpts) => {
    this.polygon.setOptions({
      strokeWeight: opts.width, // 线条宽度，默认为 2
      strokeColor:opts.color,
      fillColor:opts.fillColor ? opts.fillColor:opts.color,
      fillOpacity:opts.fillOpacity,
      strokeStyle:(opts.lineStyle == LineStyle.Dashed) ? 'dashed':'solid'
    })
  };

  contains = (point:Coordinates2D) => {
    if(point){
      const formatedVal = this.formatedCoordinatesValue(point)
      return this.polygon.contains(formatedVal) as boolean
    }else{
      return false
    }

  }

  addEvent = (event:string,callback:(map:MapInterface,shapeObj:PolyLine)=>void) => {
    this.polygon.on(event,(e:any)=>{
      callback(this.map,this)
    },this)
  }

  removeEvent = (event:string) =>{
    this.polygon.clearEvents(event)
  }

}

/*****************
  基本图形工厂类
*****************/
export class GDShape implements VectorOverlay{
  map: MapInstance;
  mapView:MapInterface
  extData?: any;
  constructor(mapView:MapInterface){
    this.map = mapView.map
    this.mapView = mapView
  }



  createPolyline = (path:Coordinates2D[],style?:PolyLineOpts) => {
    return new GDPolyLine(this.mapView,path,style)
  }

  createPolygon = (path:Coordinates2D[],style?:PolygonOpts) => {
    return new GDPolygon(this.mapView,path,style)
  }
}
