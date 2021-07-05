/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import MapInterface from './map-core'
import DeviceOverlay from './map-device'
import MapUtils from './map-utils'
import {Coordinates2D} from './common'
import LampPic from './assets/'
import StickBar from './assets/stick.svg'

export enum LightColor {
  Red = 'ff0000',
  Yellow = 'ffd700',
  Green = '00ff00',
  Default = 'ffd700'//缺省情况下是黄色
}

enum LightType {
  Arrow,
  Circle,
}

export enum Direction {
  Left = 'Left',
  Right = 'Right',
  Straight = 'Straight',
  UTurn = 'UTurn',
  Circle = 'Circle',
  Unknown = 'Unknown'
}

export interface LightsObject {
  color:LightColor
  count:number
  phaseNumber:number
  direction?:Direction
  shape?:LightType
}

type TFProps = {
  crossingNumber:number|string;
  radius:number;
  position:Coordinates2D;
  rotation:number;
  type:{phase:number;direction:Direction}[];
}

type FontStyle = {
  align:"center"|'left'|'right'|'end';
  font:string;
  color:string;
}

export type TrafficLightConfig = {
  key:string;//灯组id 唯一
  position:Coordinates2D;//位置
  radius:number;//灯盘大小
  rotation:number;//灯组角度
  crossingNumber:number|string;//路口编号 唯一
  lightType:{
    direction:Direction;
    phase:number;//相位 相位值为spat消息查询唯一依据 此处和数据结构有较强的耦合性
    type?:string;//arrow or circle
  }[]
}

export default class TrafficLights extends DeviceOverlay{
  public position:Coordinates2D
  public rotation:number
  public radius:number
  public type:{phase:number;direction:Direction}[];
  public _ctx:CanvasRenderingContext2D|null

  public fontStyle:FontStyle = {
    align:"center",
    font:'normal bold 12px Arial',
    color:'#FFFFFF',
  }

  private _mapUtils:MapUtils
  private _pixel:{x:number;y:number}

  private _wrapper:HTMLCanvasElement
  private _attachWrapper?:HTMLCanvasElement
  private _shape?:CanvasShape
  private _pictureGroup:{[name:string]:HTMLImageElement} = {}
  constructor(map:MapInterface,canvasWraper:HTMLCanvasElement,attrs:TFProps,shapeUtils?:CanvasShape,attach?:HTMLCanvasElement){
    super({mapLib:map})
    this._ctx = canvasWraper.getContext('2d');
    this.position = attrs.position
    this.radius = attrs.radius
    this.rotation = attrs.rotation
    this.type = attrs.type
    this._mapUtils = new MapUtils(this.mapLib)
    this._wrapper = canvasWraper
    this._pixel = this._mapUtils.coordinatesToPxiel(attrs.position)
    if(this._ctx){
      //耦合，后期需采用工厂方法 或者 静态类
      this._shape = new CanvasShape(canvasWraper,this._ctx)
    }
  }

  //设置灯组值
  set trafficLight(value: LightsObject[]) {
    //此处对灯组数据有耦合
    const valWithDir = this.type.map(item => {
      const current = value.find(spat => spat.phaseNumber == item.phase)
      if(current){
        return{
          ...current,
          direction:current ? item.direction:Direction.Unknown
        }
      }
    })

    this.drawLights(valWithDir)
  }

  public updateConfig = (config:TFProps) => {
    Object.assign(this, config);
  }

  //矢量绘制箭头灯
  public drawArrowLight = (x:number,y:number,radius:number,color:LightColor,angle:number,cnt:number)=>{
    if(this._ctx){
      this._ctx.beginPath();
      const x1 = this._radX(radius,angle)
      const y1 = this._radY(radius,angle)
      this._ctx.moveTo(x+x1, y-y1)

      const x2 = this._radX(radius,angle+90)
      const y2 = this._radY(radius,angle+90)
      this._ctx.lineTo(x+x2,y+(-y2))

      const x4 = this._radX(radius/2,angle+90)
      const y4 = this._radY(radius/2,angle+90)
      this._ctx.lineTo(x+x4,y+(-y4))

      const x5 = this._radX(radius,angle+90+60)
      const y5 = this._radY(radius,angle+90+60)
      this._ctx.lineTo(x+x5,y+(-y5))

      const x6 = this._radX(radius,angle+180+30)
      const y6 = this._radY(radius,angle+180+30)
      this._ctx.lineTo(x-(-x6),y+(-y6))

      const x7 = this._radX(radius/2,angle+270)
      const y7 = this._radY(radius/2,angle+270)
      this._ctx.lineTo(x-(-x7),y-y7)

      const x3 = this._radX(radius,angle+270)
      const y3 = this._radY(radius,angle+270)
      this._ctx.lineTo(x-(-x3),y-y3)
      this._ctx.lineTo(x+x1, y-y1)
      this._ctx.fillStyle = color
      this._ctx.closePath();

      this._ctx.fill();
    }
  }

  //矢量绘制圆盘灯
  public drawCircleLight = (x:number,y:number,color:LightColor,cnt:number) => {
    if(this._ctx){
      const img = this.readLampImg(Direction.Circle,color,LightType.Circle)
      this._ctx.save()
      this._ctx.translate(this._pixel.x,this._pixel.y)
      this._ctx.rotate((this.rotation)* Math.PI/180 )
      this._ctx.drawImage(img,x-this.radius,y,this.radius*2,this.radius*2);
      this.setCount(x,y,cnt,color)
      this._ctx.restore()
    }
  }

  //图片灯
  public drawPicLight = (x:number,y:number,color:LightColor,cnt:number,dir:Direction) => {
    if(this._ctx){
      const img = this.readLampImg(dir,color)
      this._ctx.save()
      this._ctx.translate(this._pixel.x,this._pixel.y)
      this._ctx.rotate((this.rotation)* Math.PI/180 )
      this._ctx.drawImage(img,x-this.radius,y,this.radius*2,this.radius*2);
      this.setCount(x,y,cnt,color)
      this._ctx.restore()
    }
  }

  public leftLight = (x:number,y:number,color:LightColor,cnt:number) => {
    //this.drawArrowLight(x,y,this.radius,color,this.rotation-90,cnt)
    this.drawPicLight(x,0,color,cnt,Direction.Left)
  }
  public strightLight = (x:number,y:number,color:LightColor,cnt:number) => {
    //this.drawArrowLight(x,y,this.radius,color,this.rotation,cnt)
    this.drawPicLight(x,0,color,cnt,Direction.Straight)

  }
  public rightLight = (x:number,y:number,color:LightColor,cnt:number) => {
    //this.drawArrowLight(x,y,this.radius,color,this.rotation-270,cnt)
    this.drawPicLight(x,0,color,cnt,Direction.Right)
  }




  public drawLights = (value?:(LightsObject|undefined)[]) => {
    if(!value || this._pixel === undefined){
      return
    }

    let offsetX = 0
    this._wrapper.width = this._wrapper.width

    //灯盘
    this.drawLightsPane(value.length)

    //灯组单元
    value.map(item => {
      if(item == undefined){
        return
      }
      if(item.shape == LightType.Circle){

      }else{
        switch (item.direction) {
          case Direction.Left:
            this.leftLight(offsetX,0,item.color,item.count)
            break;
          case Direction.Straight:
            this.strightLight(offsetX,0,item.color,item.count)
            break;
          case Direction.Right:
            this.rightLight(offsetX,0,item.color,item.count)
            break;
          case Direction.Circle:
            this.drawCircleLight(offsetX,0,item.color,item.count)
            break;
          default:
            break;
        }

        offsetX += this.radius * 2
        //offsetY += Math.cos(Math.PI * 2 / 360 * (this.rotation + 90)) * this.radius * 2
      }
    })

  }



  //灯盘绘制
  public drawLightsPane = (lightsCount:number,style?:CanvasStyle) => {
    if(this._ctx){
      if(this._shape){
        const paneStyle = {
          x:-this.radius,
          y:-this.radius/2,
          width:this.radius*2*lightsCount,
          height:this.radius*4,
          corner:5,
          fillColor:'#333333',
          strokeColor:'#FFFFFF'
        }


        if(this._pictureGroup['StickBar'] == undefined){
          this._pictureGroup['StickBar'] = new Image()
          this._pictureGroup['StickBar'].src = StickBar
        }
        const img = this._pictureGroup['StickBar']

        this._ctx.save()
        this._ctx.translate(  this._pixel.x,this._pixel.y)
        this._ctx.rotate((this.rotation)* Math.PI/180 )
        this._shape.roundRect(paneStyle)

        this._ctx.drawImage(img,(this.radius*lightsCount)/2 - 5,this.radius*4 - 5,10,20);

        this._ctx.restore()
      }
    }
  }

  //灯组数字
  public setCount = (x:number,y:number,cnt:number,fontColor?:string) => {
    if(this._ctx){
      const posX = x
      const posY = y + this.radius*3 + 2
      this._ctx.textAlign = this.fontStyle.align
      this._ctx.font = this.fontStyle.font
      this._ctx.fillStyle = fontColor? `#${fontColor}`:this.fontStyle.color
      this._ctx.fillText(cnt.toString(),posX,posY)
    }
  }

  public setCounterStyle = (style:FontStyle) => {
    this.fontStyle = style
 }
  //灯组图片 图片命名规则按照: ‘方向_色号’
  public readLampImg = (direction:Direction,color:string,type:LightType = LightType.Arrow) => {
    if(this._pictureGroup[`${direction}_${color}`] == undefined){
      this._pictureGroup[`${direction}_${color}`] = new Image()
      switch(type){
        case LightType.Arrow:
          this._pictureGroup[`${direction}_${color}`].src = LampPic.arrowType[`${direction}_${color}`]
          break;
        case LightType.Circle:
          this._pictureGroup[`${direction}_${color}`].src = LampPic.circleType[`circle_${color}`]
          break;
        default:
          this._pictureGroup[`${direction}_${color}`].src = LampPic.arrowType[`${direction}_${color}`]
          break;
      }
    }

    return this._pictureGroup[`${direction}_${color}`]
  }

  //设置灯组图片 图片命名规则按照: ‘方向_色号’
  public setLampImg = (path:string) => {

  }

  //设置图层所在地图
  public setMap = (position:Coordinates2D) => {

    const render = () => {

      this._pixel = this._mapUtils.coordinatesToPxiel(position)

      this.drawLights()
    }

    this.addCanvasLayer(this._wrapper,render)
    if(this._attachWrapper){
      this.addCanvasLayer(this._attachWrapper,render)
    }
  }

  //额外数据
  public setExtraData = (data:any) => {
    this.extData = data
  }


  //求圆弧上的点
  private _radX = (radius:number,angle:number)=>{
    return   Math.sin(Math.PI * 2 / 360 * angle) * radius
  }
  private _radY = (radius:number,angle:number)=>{
    return  Math.cos(Math.PI * 2 / 360 * angle) * radius
  }
}

type CanvasStyle = {x:number, y:number, width:number, height:number, corner?:number,strokeColor?:string,fillColor?:string}
class CanvasShape {
  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D

  constructor(wrapper:HTMLCanvasElement,context:CanvasRenderingContext2D){
    this.canvas = wrapper
    this.ctx = context
  }

  public roundRect = (style:CanvasStyle) =>
  {

    const r = style.x + style.width;
    const b = style.y + style.height;
    const conerRadius = style.corner ? style.corner:0
    this.ctx.beginPath();




    this.ctx.lineWidth= 4;
    this.ctx.moveTo(style.x+conerRadius, style.y);
    this.ctx.lineTo(r-conerRadius, style.y);
    this.ctx.quadraticCurveTo(r, style.y, r, style.y+conerRadius);
    this.ctx.lineTo(r, style.y + style.height-conerRadius);
    this.ctx.quadraticCurveTo(r, b, r-conerRadius, b);
    this.ctx.lineTo(style.x+conerRadius, b);
    this.ctx.quadraticCurveTo(style.x, b, style.x, b-conerRadius);
    this.ctx.lineTo(style.x, style.y+conerRadius);
    this.ctx.quadraticCurveTo(style.x, style.y, style.x+conerRadius, style.y);

    this.ctx.closePath();
    if(style.strokeColor){
      this.ctx.strokeStyle = style.strokeColor;
      this.ctx.stroke();
    }

    if(style.fillColor){
      this.ctx.fillStyle = style.fillColor;
      this.ctx.fill()
    }

  }
}
