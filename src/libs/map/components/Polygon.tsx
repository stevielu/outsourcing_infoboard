/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {FunctionComponent,useEffect,useImperativeHandle,useState,useMemo} from 'react'
import {MapChildrenProps} from './Map'
import {Coordinates2D} from '../common'
import {MapVectorGraph,LineStyle,Polygon} from '../map-vector'

/*多边形*/
interface PolygonPorps extends MapChildrenProps {
  path:[Coordinates2D]
  width:number;
  color:string;
  manager?:MapVectorGraph
  cRef?:any
}

 const PolygonComp:FunctionComponent<PolygonPorps> = (props) => {
  const [manager,setManager] = useState<MapVectorGraph>()
  const [polygon,setPolygon] = useState<Polygon>()

  useImperativeHandle(props.cRef, () => {
    // return返回的值就可以被父组件获取到
    return {polygon}
  })

  useEffect(()=>{
    const mapInstance = props.mapView

    if(!props.manager){
      setManager(new MapVectorGraph(mapInstance!))
    }else{
      setManager(props.manager)
    }

  },[])

  useMemo(()=>{
    if(manager){
      const shp = manager.vectorgraph.createPolygon(props.path,{width:props.width,color:props.color,fillOpacity:0.1,lineStyle:LineStyle.Dashed})
      setPolygon(shp)
    }
  },[manager])

  useMemo(()=>{
    if(polygon){
      polygon.setStyle({width:props.width,color:props.color,fillOpacity:0.1,lineStyle:LineStyle.Dashed})
    }
  },[props.color])

  return null
}
export default PolygonComp
