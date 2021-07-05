/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Marker,{MarkerProps} from './map-marker'
import GeoCoder from './map-geocoder'
import {GDMarker,GDGeocoder} from './gdmap/'
import {MapType} from './common'



export class MapInstance{
  public id?:string
  public version?:string
  public type:MapType = MapType.Undefined
  public originMapObject?:any;
  private _originInstance?: any;//原始地图实例



  constructor(type:MapType,id?:string){
    this.id = id
    this.type = type

  }

  public set originInstance(value: any) {
      this._originInstance = value;
  }
  public get originInstance(): any {
      return this._originInstance;
  }

  public makeMarker(props:MarkerProps):Marker{
    switch(this.type){
      case MapType.Gaode:
        return new GDMarker({map:this,...props})
      default:
        return new GDMarker({map:this,...props})
    }
  }

  public makeGeocoder():GeoCoder{
    switch(this.type){
      case MapType.Gaode:
        return new GDGeocoder({map:this})
      default:
        return new GDGeocoder({map:this})
    }
  }

}
