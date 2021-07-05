import MapOverlay from './map-overlay'
import MapInterface from './map-core'
import { Coordinates2D,MapType } from './common';
import {GDShape} from './gdmap'


/*折线 形状图 接口及属性配置*/
export enum LineStyle {
  Dashed,
  Solid,
}

interface BaseShapeStyle {
  width:number;
  color:string;
  borderColor?:string;
  opacity?:number;
  lineStyle?:LineStyle;
}

export interface PolyLineOpts extends BaseShapeStyle{
  isBorder?:boolean;
  showArrow?:boolean;
}

export interface PolygonOpts extends BaseShapeStyle{
  fillOpacity?:number;
  fillColor?:string;
}

export interface Shape {
  path:Coordinates2D[]
  setPath:(path:[Coordinates2D]) => void
  show: () => void;
  hide: () => void;
}

export interface PolyLine extends Shape{
  setStyle:(opts:PolyLineOpts) => void;
}

export interface Polygon extends Shape{
  setStyle:(opts:PolygonOpts) => void;
  contains:(point:Coordinates2D) => boolean
}

//基础矢量图
export interface VectorOverlay extends MapOverlay{
  //折线
  createPolyline:(path:Coordinates2D[],style?:PolyLineOpts) => PolyLine
  //多边形
  createPolygon:(path:Coordinates2D[],style?:PolygonOpts) => Polygon
}



/*地图矢量图绘制类*/
export class MapVectorGraph{
  vectorgraph:VectorOverlay
  mapInstace:MapInterface
  constructor(mapInstance:MapInterface){
    this.mapInstace = mapInstance
    const mapView = mapInstance.map

    switch (mapView.type) {
      case MapType.Gaode:
          this.vectorgraph = new GDShape(mapView)
        break
      default:
          this.vectorgraph = new GDShape(mapView)
        break
    }

  }

  //虚实线由两条线合并实现，一条底实现，一条虚线，DashColor为虚线颜色
  drawDashedLine = (path:Coordinates2D[],style:PolyLineOpts,dashColor:string) => {
    let customStyle = {
      ...style,
      lineStyle:LineStyle.Dashed
    }
    this.vectorgraph.createPolyline(path,style)
    customStyle.color = dashColor
    this.vectorgraph.createPolyline(path,customStyle)
  }
}
