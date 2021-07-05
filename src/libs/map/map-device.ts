/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import MapInterface from './map-core'
import {MapInstance} from './map-object'
import MarkerProps from './map-marker'
import MapOverlay from './map-overlay'
import CanvasLayer from './map-canvaslayer'
export default class DeviceOverlay implements MapOverlay{
  id = ''
  layer?:CanvasLayer
  map?:MapInstance
  mapLib:MapInterface
  marker?:MarkerProps
  extData?:any


  constructor (init:{mapLib:MapInterface,marker?:MarkerProps,id?:string,extData?:Object}){

    Object.assign(this, init);
    this.mapLib = init.mapLib
    this.map = init.mapLib.map
  }

  public addCanvasLayer = (wrapper:HTMLCanvasElement,render:()=>void) =>{
    this.layer = this.mapLib.addCanvasLayer(wrapper,render)
  }

  public removeCanvasLayer = ()=> {
    if(this.layer){
      this.mapLib.removeCanvasLayer(this.layer)
    }
  }
}
