/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import MapInterface from './map-core'
import MarkerProps from './map-marker'
import MapUtils from './map-utils'
import {Coordinates2D,Coordinate2DInvalid,MapType} from './common'
import {Polygon} from './map-vector'
import * as VehIco from './assets/vehicle'
type CaseModel = ['Commercial','V2X']


export const VehicleIcon = {
  'Special' : VehIco.special,
  'Van':VehIco.van,
  'Pickup':VehIco.pickup,
  'Ambulance' :VehIco.ambulance,
  'Firetruck' :VehIco.firetruck,
  'Police':VehIco.polcie,
  'School':VehIco.school,
  'Bus':VehIco.minibus,
}

export enum VehType {
  SPECIAL_VEH = 'Special',
  VAN = 'Van',
  PICKUP = 'Pickup',
  AMBULANCE = 'Ambulance',
  FIRE_TRUCK = 'Firetruck',
  POLICE = 'Police',
  SCHOOL = 'School',
  MINI_BUS = 'Bus',
}

export enum DataStatus{
  Received,
  Receiving,
}
class Vehicle {
  position:Coordinates2D
  private _plateNum:string = ''
  private _speed:number = 0
  private _type:VehType = VehType.VAN
  angle:number = 0
  bsm:any;
  notification?:(data:any) => void;//车辆消息订阅处理
  extendData?:any;


  constructor(init:Partial<Vehicle>){
    Object.assign(this, init);
    this.position = init.position!
  }

  set vehicleData(value:Partial<Vehicle>) {
    Object.assign(this, value);
  }

  set speed(value:number){
    this._speed = Math.round(value)
  }

  get speed(){
    return this._speed
  }

  set plateNum(value:string){
    const vn = value.split('.')

    if(vn[0] && vn[1]){
      const prefix = vn[0]
      const content = vn[1]

      const value = prefix.split('_').filter(item => item != '')
      const endfix = content.split('_')
      const city = VNStandard[value[0]]
      const district = value[1]


      if(endfix.length > 1){
        this._plateNum = city+district+endfix[0]+SpecVN[endfix[1]]
      }else{
        this._plateNum = city+district+content
      }

    }
    else{
      this._plateNum = value
    }

  }

  get plateNum(){
    return this._plateNum
  }


  get type(){
    return this._type
  }

  set type(value:VehType){
    this._type = value
  }
}

type MotionValue = {
  position:Coordinates2D;
  speed:number;
  angle:number;
  bsm?:any
}
export type MotionConfig = {
    useCalcHeading:boolean
}

export default class MarkerMotion extends Vehicle{
  private _motionValue?:MotionValue
  private _config:MotionConfig = {
    useCalcHeading:false,
  }

  utils:MapUtils
  map:MapInterface
  marker:MarkerProps
  id?:string
  sequence:number = 0;
  //数据接收状态
  status:DataStatus = DataStatus.Receiving

  //业务模型
  commVeh?:CommercialVehicle
  v2xScene?:V2XScene

  constructor (map:MapInterface,marker:MarkerProps,config?:MotionConfig,id?:string){
    super({position:marker.position})
    this.map = map
    this.marker = marker
    this.utils = new MapUtils(map)
    this.id = id
    if(this.marker.setAnchor){
      this.marker.setAnchor('center')
    }

    if(config){
      this._config = config
    }
  }

  get motionValue() {
    return this._motionValue
  }

  set motionValue(value: any) {
      let  gpsVal = {longitude:value.longitude,lattitude:value.lattitude}
      let distance = 0
      this.status = DataStatus.Received
      if(this.map.map.type == MapType.Gaode){
        gpsVal = MapUtils.ws84tojc02({longitude:value.longitude,lattitude:value.lattitude})
      }

      if(this._motionValue?.position){
        distance = MapUtils.getDistance(gpsVal,this._motionValue.position) * 1000
        if(0.5 < distance && distance< 40){
          // const s = value.speed*3.6//km/h
          // const d = dist/1000//km
          // const t = d/s * 3600000//ms

          this.marker.moveTo([{...gpsVal}],200)
        }
      }else{
        this.marker.moveTo([{...gpsVal}],200)
      }



      if(this._config.useCalcHeading == true){
        if(this._motionValue && this._motionValue.position){
          this.setCalcHeading(gpsVal,this._motionValue.position)
        }
      }else{
        this.marker.setAngle(value.heading)
      }

      if(this.commVeh){
        this.commVeh!.vehicleData = {position:gpsVal,...value}
      }
      this._motionValue = {
        ...value,
        angle:value.heading,
        position:gpsVal
      };
  }


  setMotionLabel = (content:JSX.Element,anchor?:'center'|'top'|'bottom'|'left'|'right') => {
    this.marker.setLabel(content,anchor)
  }

  remove = () => {
    this.map.removeMarker(this.marker)
  }

  setCalcHeading = (dst:Coordinates2D,src:Coordinates2D) => {
    if(!this._motionValue){return}
    if(dst.lattitude == src.lattitude && dst.longitude == src.longitude){return}
    if(src != Coordinate2DInvalid){
      const angle = MapUtils.getAngle(src,dst)
      if(this._motionValue.angle - angle < 60 && this._motionValue.angle - angle > -60){

        this.marker.setAngle(angle)
      }
    }
  }
}

const VNStandard = {
  '1':'京',
  '2':'津',
  '3':'冀',
  '4':'晋',
  '5':'蒙',
  '6':'辽',
  '7':'吉',
  '8':'黑',
  '9':'沪',
  '10':'苏',
  '11':'浙',
  '12':'皖',
  '13':'闽',
  '14':'赣',
  '15':'鲁',
  '16':'豫',
  '17':'鄂',
  '18':'湘',
  '19':'粤',
  '20':'桂',
  '21':'琼',
  '22':'渝',
  '23':'川',
  '24':'贵',
  '25':'云',
  '26':'藏',
  '27':'陕',
  '28':'甘',
  '29':'青',
  '30':'宁',
  '31':'新',
}as {[name:string]:string}


const SpecVN = {
  '1':'使',
  '2':'警',
  '3':'学',
  '4':'挂',
  '5':'港',
  '6':'澳',
}as {[name:string]:string}


//车辆运营
type StationValue = {
  name:string;
  position:Coordinates2D
}

export class CommercialVehicle extends Vehicle{
  private _stations:StationValue[] = []//运营站点
  private _fence?:Polygon //电子围栏
  public isInnerFence:boolean = true//是否在电子围栏内 true为在里面
  public passanger:number = 2
  public setedPassanger = false
  //站点配置
  get stationValue() {
    return this._stations
  }

  set stationValue(value: StationValue[]) {
    this._stations = value
  }

  //电子围栏配置
  get fenceValue() {
    return this._fence
  }

  set fenceValue(value: Polygon|undefined) {
    this._fence = value
  }


  constructor(init:Partial<Vehicle>){
    super(init)
  }

  //是否到达任意站点
  public isOnArrive = () => {
    for (let i = 0; i < this._stations.length; i++) {
      const dis = this._GetDistance(this._stations[i].position,this.position)
      if(dis < 10 && this.speed < 2){
        return {result:true,name:this._stations[i].name}
      }
    }

    return {result:false,name:''}

  }

  public isOutscope = () =>{

    if(this._fence ){
      const res = this._fence.contains(this.position)
      this.isInnerFence = res
      return res//false 圈外,true 圈内
    }
  }

  private _GetDistance = ( src:Coordinates2D,dst:Coordinates2D)=>{
    var radLat1 = src.lattitude*Math.PI / 180.0;
    var radLat2 = dst.lattitude*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = src.longitude*Math.PI / 180.0 - dst.longitude*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s * 1000;//m
}
}

//车辆业务
export class V2XScene extends Vehicle{
  private _v2xName:string = '';
  private _v2xData = {};
  private _timmer:any;
  constructor(init:Partial<Vehicle>){

    super(init)


  }

  get v2xName() {
    return this._v2xName
  }

  set v2xName(value: string) {
    this._v2xName = value
  }

  get v2xData() {
    return this._v2xData
  }

  set v2xData(value: any) {
    this._v2xData = value
    clearInterval(this._timmer)
    this._timmer = window.setInterval(this.clear,2000)
  }

  clear = () => {
    this._v2xData = {}
  }
}
