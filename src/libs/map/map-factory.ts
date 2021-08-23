/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {MapType} from './common'
import MapInterface,{MapOption} from './map-core'
import {GDMap} from './gdmap/'
import {OLMap} from './openlayer'




class MapFactory{
  private _type:MapType|string = MapType.Gaode//默认高德地图sdk
  constructor(type?:MapType|string){
    if(type){
      this._type = type
    }
  }

  public makeMapProvider(opt?:MapOption):MapInterface{
    switch(this._type){
      case MapType.Gaode:
        return new GDMap('9e46acdabe882288e98a7896d2276fd4',opt)
      case MapType.OpenLayers:
        return new OLMap()
      default:
        return new GDMap('9e46acdabe882288e98a7896d2276fd4',opt)
    }
  }

}

export default MapFactory
