/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{ FunctionComponent,useEffect,useState,useCallback} from 'react'
import {Coordinates2D,WMSProtocol,ThreeDimension,MapType} from '../common'
import MapInterface from '../map-core'
import GeoCoder from '../map-geocoder'
import {MapVectorGraph} from '../map-vectoroverlay'
import MapFactory from '../map-factory'
import Logger from '../../../utils/logger'

type MapEvent = {
  event:string;
  handle:(e:MapInterface)=>void;
  extra?:any;
}

export type MenuConfig = {
  config:MapEvent|MapEvent[]
  onOpen?:(e:{pos:Coordinates2D})=>void;
}
type ModelOption = {id?:string,options:ThreeDimension}
type MapProps = {
  type:MapType;
  map?:MapInterface;
  mapKey?:string;
  zoom?:number;
  position?:Coordinates2D;
  initialPostion?:Coordinates2D;
  addEventListener?:MapEvent|MapEvent[];
  wmsLayer?:{tileUrl:string;config:WMSProtocol|WMSProtocol[]};
  model?:ModelOption[]//3d模型
}

const Toast = Logger('map')
export interface MapChildrenProps{
  mapView?:MapInterface|null;
  type?:MapType;
  loadState?:boolean;
}



export const useMap = (type:MapType,mapInstance?:MapInterface)=>{
  const [mapView] = useState<MapInterface>(()=>{
    if(!mapInstance){
      const factory = new MapFactory(type)
      const newMap = factory.makeMapProvider()
      return newMap
    }
    return mapInstance
  })

  const [asyncGeocoder] = useState(()=>{
    const newGeoCoder = mapView.onload().then((map) => {
      return map.makeGeocoder()
    })
    return newGeoCoder
  })

  const [mapGraph] = useState(()=>{
    const newMapGraph = mapView.onload().then((map) => {
      return  new MapVectorGraph(mapView)
    })
    return newMapGraph
  })
  return {mapView,asyncGeocoder,mapGraph}
}

export const Map:FunctionComponent<MapProps> = (props) => {
  let {mapView} = useMap(props.type,props.map)
  let mapWraper:HTMLDivElement | null = null
  const [loadMapState,setLoadMapState] = useState(false)

  //map为异步加载，Mount 之后初始化Load地图
  useEffect(()=>{
    if(mapWraper && mapView){
      mapView.createInstance(
        mapWraper,
        props.initialPostion,
        props.zoom,
      ).then((loadState) => {
        // Toast.successAlert(`地图加载完成`)
        setLoadMapState(loadState)
      }).catch( err => {
        Toast.errorAlert(`加载地图失败:${err.message}`)
      })
    }

  },[])



  useEffect(()=>{
    if(props.position && loadMapState == true && mapView){
      mapView.moveTo(props.position)
    }
  },[props.position])

  useEffect(()=>{
    if(props.addEventListener){
      const mapEvent = props.addEventListener
      mapView.onload().then(map =>{
        if(Array.isArray(mapEvent)){

        }else{
          mapView.addEventListener(mapEvent.event,mapEvent.handle)
        }
      })

    }
  },[props.addEventListener])

  useEffect(()=>{
    if(props.wmsLayer){
        const layer = props.wmsLayer
        mapView.onload().then(map =>{
          mapView.addTileLayer(layer.tileUrl,layer.config)
        })
    }
  },[props.wmsLayer])

  useEffect(()=>{
    if(props.model){

        const options = props.model
        mapView.onload().then(map =>{

          options.forEach(item =>{
            console.log('add 3d models')
            mapView.add3DModel(item.options,item.id)
          })

        })
    }
  },[props.model])

  useEffect(()=>{
    return (()=>{
      if(props.addEventListener){
        if(Array.isArray(props.addEventListener)){

        }else{
          mapView.removeEventListener(props.addEventListener.event,props.addEventListener.handle)
        }
      }
    })
  },[])



  let childrenWithProps
  const children = props.children
  const cloneChild = (child: React.ReactElement<MapChildrenProps>): React.ReactElement<MapChildrenProps> => {
    const newProps = {
        mapView: mapView,
        type:props.type,
        loadState:loadMapState,
    }
    return React.cloneElement<MapChildrenProps>(child, newProps);
  }


    childrenWithProps = React.Children.map(
      children,
      (child) =>{
          if(React.isValidElement(child)){
          return cloneChild(child)

          }
      }
    )

  return (
    <div ref = {(node) => {mapWraper = node}} style = {{width: '100%', height: '100%'}}>
      {loadMapState && childrenWithProps}
    </div>
  )

}
