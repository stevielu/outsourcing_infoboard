/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {VectorOverlay,PolyLine,Polygon,PolyLineOpts,PolygonOpts,LineStyle} from '../map-vector'
import { Coordinates2D } from '../common';
import {MapInstance} from '../map-object';

/*****************
  基类
*****************/
class GDBaseVector {
  amap:any
  AMapLib:any
  path:Coordinates2D[] = []
  constructor(map:MapInstance,path:Coordinates2D[]){
    this.amap = map.originMapObject
    this.AMapLib =  map.originInstance
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
}

/*****************
  折线
*****************/
export class GDPolyLine extends GDBaseVector implements PolyLine {
  polyline:any

  constructor(map:MapInstance,path:Coordinates2D[],style?:PolyLineOpts){
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
    }else{
      console.log('add polyline error,invalid path parameters')
    }

  }



  setStyle = (opts: PolyLineOpts) => {

  };

}


/*****************
  多边形
*****************/
export class GDPolygon extends GDBaseVector implements Polygon {
  polygon:any

  constructor(map:MapInstance,path:Coordinates2D[],style?:PolygonOpts){
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

}

/*****************
  基本图形工厂类
*****************/
export class GDShape implements VectorOverlay{
  map: MapInstance;
  extData?: any;
  constructor(map:MapInstance){
    this.map = map
  }



  createPolyline = (path:Coordinates2D[],style?:PolyLineOpts) => {
    return new GDPolyLine(this.map,path,style)
  }

  createPolygon = (path:Coordinates2D[],style?:PolygonOpts) => {
    return new GDPolygon(this.map,path,style)
  }
}
