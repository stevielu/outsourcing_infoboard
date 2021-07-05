/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {Coordinates2D,PixelValue,MapType} from './common'
import GDUtils from './gdmap/gd-utils'
import MapInterface from './map-core'

const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

export interface MapUtilsInterface{
  /*Coordinates Convertion*/
  coordinatesToPxiel:(coordinates:Coordinates2D) => PixelValue
  pxielToCoordinates:(value:PixelValue) => Coordinates2D|undefined
  coordinatesFormatter:(target:[number,number]) => Coordinates2D
  coordinatesGroupFormatter:(target:number[][]) => Coordinates2D[]
  convertGPS:(target:Coordinates2D) => Coordinates2D
  convertGPSGroup:(target:Coordinates2D[]) => Coordinates2D[]
}

export default class MapUtils{
  private _mapUtils:MapUtilsInterface


  constructor (mapInstance:MapInterface){
    switch(mapInstance.map.type){
      case MapType.Gaode:
        this._mapUtils = new GDUtils(mapInstance.map)
      default:
        this._mapUtils = new GDUtils(mapInstance.map)
    }
  }

  private static _rad(d:number) {
     return d * Math.PI / 180.0;
  }

  /**
   * 坐标转化，投影坐标转极坐标
   * @param {coordinates} 投影坐标
   * @returns {x,y}极坐标
   **动态方法,高德提供
   */
  public coordinatesToPxiel(coordinates:Coordinates2D){
    return this._mapUtils.coordinatesToPxiel(coordinates)
  }

  /**
   * 坐标转化，极坐标转投影坐标
   * @param {value} 极坐标{x,y}
   * @returns  投影Coordinates2D
   **动态方法,高德提供
   */
  public pxielToCoordinates(value:PixelValue){
    return this._mapUtils.pxielToCoordinates(value)
  }

  /**
   * 坐标转化，高德坐标格式
   * @param {coordinates} wgs84坐标
   * @returns  Coordinates2D gjc02坐标
   **动态方法，即将剥除
   */
  public convertGPS(coordinates:Coordinates2D){
    return this._mapUtils.convertGPS(coordinates)
  }

  /**
   * 坐标格式化，高德坐标格式[lat,lon][]砖为Coordinates2D[]
   * @param {target} 坐标
   * @returns array Coordinates2D 目的坐标
   */
  public coordinatesGroupFormatter = (target:number[][]) =>{
    return this._mapUtils.coordinatesGroupFormatter(target)
  }


  /**
   * 垂直向西偏移坐标
   * @param {cords} 起始坐标
   * @param {dist} 偏移距离
   * @returns {number} 目的坐标
   */
  public static moveLeft(cords:Coordinates2D, dist:number) {
    const d = dist / (6371.393*1000);
    const cs = Math.cos(this._rad(cords.lattitude));
    const c = d / cs * 180.0 / Math.PI;
    return  {longitude:cords.longitude - c,lattitude:cords.lattitude} as Coordinates2D
  }
  /**
   * 垂直向南偏移坐标
   * @param {cords} 起始坐标
   * @param {dist} 偏移距离
   * @returns {number} 目的坐标
   */
  public static moveBottom(cords:Coordinates2D, dist:number) {
        const d = dist / (6371.393*1000);
        const c = d / Math.PI * 180.0;
        return  {longitude:cords.longitude,lattitude:cords.lattitude - c} as Coordinates2D
  }
  /**
   * 垂直向东偏移坐标
   * @param {cords} 起始坐标
   * @param {dist} 偏移距离
   * @returns {number} 目的坐标
   */
  public static moveRight(cords:Coordinates2D, dist:number) {
    const d = dist / (6371.393*1000);
    const cs = Math.cos(this._rad(cords.lattitude));
    const c = d / cs * 180.0 / Math.PI;
    return  {longitude:cords.longitude + c,lattitude:cords.lattitude} as Coordinates2D
  }

  /**
   * 垂直向北偏移坐标
   * @param {cords} 起始坐标
   * @param {dist} 偏移距离
   * @returns {number} 目的坐标
   */
  public static moveUp(cords:Coordinates2D, dist:number) {
        const d = dist / (6371.393*1000);
        const c = d / Math.PI * 180.0;
        return  {longitude:cords.longitude,lattitude:cords.lattitude + c} as Coordinates2D
  }

  /**
   * 计算坐标之间角度
   * @param {start} 起始坐标
   * @param {end} 目的坐标
   * @returns {number} 输出角度
   */
  public static getAngle = (start:Coordinates2D, end:Coordinates2D) => {
      const lat_a = start.lattitude;
      const lng_a = start.longitude;
      const lat_b = end.lattitude;
      const lng_b = end.longitude;
      var a = (90 - lat_b) * Math.PI / 180;
      var b = (90 - lat_a) * Math.PI / 180;
      var AOC_BOC = (lng_b - lng_a) * Math.PI / 180;
      var cosc = Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(AOC_BOC);
      var sinc = Math.sqrt(1 - cosc * cosc);
      var sinA = Math.sin(a) * Math.sin(AOC_BOC) / sinc;
      var A = Math.asin(sinA) * 180 / Math.PI;
      var res = 0;
      if (lng_b > lng_a && lat_b > lat_a) res = A;
      else if (lng_b > lng_a && lat_b < lat_a) res = 180 - A;
      else if (lng_b < lng_a && lat_b < lat_a) res = 180 - A;
      else if (lng_b < lng_a && lat_b > lat_a) res = 360 + A;
      else if (lng_b > lng_a && lat_b == lat_a) res = 90;
      else if (lng_b < lng_a && lat_b == lat_a) res = 270;
      else if (lng_b == lng_a && lat_b > lat_a) res = 0;
      else if (lng_b == lng_a && lat_b < lat_a) res = 180;
      return res;
  }

  /**
   * 计算坐标之间距离
   * @param {start} 起始坐标
   * @param {end} 目的坐标
   * @returns {number} 输出距离
   */
  public static getDistance = (start:Coordinates2D, end:Coordinates2D) => {
    const lat1 = start.lattitude
    const lat2 = end.lattitude
    const lon1 = start.longitude
    const lon2 = end.longitude
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lon1*Math.PI / 180.0 - lon2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  }

/**
 * wgs84 转 gcj02
 * @param {Coordinates2D} wgs84坐标
 * @returns {Coordinates2D} 输出坐标
 */
  public static ws84tojc02 = (value:Coordinates2D) => {
    const lng = value.longitude;
    const lat = value.lattitude;

    let dlat = MapUtils._transformlat(lng - 105.0, lat - 35.0);
    let dlng = MapUtils._transformlng(lng - 105.0, lat - 35.0);
    let radlat = lat / 180.0 * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    let sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    let mglat = lat + dlat;
    let mglng = lng + dlng;
    return {longitude:mglng,lattitude:mglat} as Coordinates2D


  }

  private static _transformlat = (lng:number,lat:number) =>{
      var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
      ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
      return ret
  }

  private static _transformlng = (lng:number,lat:number) => {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  }



  /**
 * 计算延长坐标点
 * @param {Coordinates2D} start 第一个经纬度坐标点
 * @param {number} distance 下一个经纬度的距离
 * @param {number} angel 方向
 * @returns {Coordinates2D} 目的坐标
 */
  public static offset(value:{start:Coordinates2D,distance:number,angle:number}){
    // number of km per degree = ~111km (111.32 in google maps, but range varies
    //between 110.567km at the equator and 111.699km at the poles)
    // 1km in degree = 1 / 111.32km = 0.0089
    // 1m in degree = 0.0089 / 1000 = 0.0000089
    const distanceKilometres = value.distance
    const startPoint = value.start
    const radiusEarthKilometres = 6371.393;
    const initialBearingRadians = value.angle * (Math.PI / 180);
    var distRatio = distanceKilometres / radiusEarthKilometres;
    var distRatioSine = Math.sin(distRatio);
    var distRatioCosine = Math.cos(distRatio);

    var startLatRad = MapUtils.DegreesToRadians(startPoint.lattitude);
    var startLonRad = MapUtils.DegreesToRadians(startPoint.longitude);

    var startLatCos = Math.cos(startLatRad);
    var startLatSin = Math.sin(startLatRad);

    var endLatRads = Math.asin((startLatSin * distRatioCosine) + (startLatCos * distRatioSine * Math.cos(initialBearingRadians)));

    var endLonRads = startLonRad
        + Math.atan2(
            Math.sin(initialBearingRadians) * distRatioSine * startLatCos,
            distRatioCosine - startLatSin * Math.sin(endLatRads));

    return {lattitude:MapUtils.RadiansToDegrees(endLatRads),longitude:MapUtils.RadiansToDegrees(endLonRads)} as Coordinates2D

	}

/**
 * 角度转弧度
 * @param {number} degrees 角度
 * @returns {number} 输出弧度
 */
  public static DegreesToRadians( degrees:number){
      const  degToRadFactor = Math.PI / 180;
      return degrees * degToRadFactor;
  }

  /**
   * 弧度转角度
   * @param {number} degrees 弧度
   * @returns {number} 输出角度
   */
  public static RadiansToDegrees( radians:number){
      const radToDegFactor = 180 / Math.PI;
      return radians * radToDegFactor;
  }
}
