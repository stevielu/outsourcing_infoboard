/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {MapUtilsInterface} from '../map-utils';
import {Coordinates2D,PixelValue} from "../common";
import {MapInstance} from '../map-object'

const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

class GDUtils implements MapUtilsInterface {
  private _map:any|null = null;//高德地图对象
  private _AMap:any|null = null;//高德地图基础类

  public constructor(map:MapInstance) {
    this._AMap = map.originInstance
    this._map = map.originMapObject
  }

  //地图坐标转换为HTML界面像素坐标 相对地图容器所在位置
  public coordinatesToPxiel = (coordinates:Coordinates2D) => {
    const lnglat =  new this._AMap.LngLat(coordinates.longitude, coordinates.lattitude)
    const pixel = this._map.lngLatToContainer(lnglat) as PixelValue
    return pixel
  }

  //HTML界面像素坐标 相对地图容器所在位置 转为地理坐标
  public pxielToCoordinates = (value:PixelValue) => {
    const pixel = new this._AMap.Pixel(value.x,value.y);
    const lnglat = this._map.containerToLngLat(pixel)
    const inputVal = lnglat.split(',');
    if(inputVal){
      const formatedCoords = {longitude:inputVal[0],lattitude:inputVal[1]} as Coordinates2D
      return formatedCoords
    }else{
      return undefined
    }
  }

  //坐标数组格式化，纬度在前
  public coordinatesFormatter = (target:number[]) => {
    return {lattitude:target[0],longitude:target[1]} as Coordinates2D
  }

  public coordinatesGroupFormatter = (target:number[][]) => {
    return target.map(item => {
      return this.coordinatesFormatter(item)
    })
  }

  //wgs84 转 gcj02
  public convertGPS = (target:Coordinates2D) => {
    const res = this._ws84tojc02(target.lattitude,target.longitude)
    return this.coordinatesFormatter([res[1],res[0]])
  }

  public convertGPSGroup = (target:Coordinates2D[]) => {
    return target.map(item => {
      return this.convertGPS(item)
    })
  }

  private _ws84tojc02 = (lat:number,lng:number) => {
    var dlat = this._transformlat(lng - 105.0, lat - 35.0);
    var dlng = this._transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat]


  }

  private _transformlat = (lng:number,lat:number) =>{
      var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
      ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
      return ret
  }

  private _transformlng = (lng:number,lat:number) => {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  }
}

export default GDUtils
