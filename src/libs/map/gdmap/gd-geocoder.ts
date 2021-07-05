/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import GeoCoder,{GeoResponse} from '../map-geocoder'
import { Coordinates2D } from '../common';
import {MapInstance} from '../map-object';



class GDGeocoder implements GeoCoder {
  map: MapInstance|null = null;

  private _AMap:any|null = null;//高德地图基础类
  private _geoCoder:any = null

  public constructor(init:Partial<GDGeocoder>) {
    Object.assign(this, init);

    this._AMap = this.map && this.map.originInstance

    if(this._AMap){
      this._geoCoder = new this._AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode

      })
    }
  }

  public reverseGeocodeCoordinate = (location: Coordinates2D) => {
    let self = this
    console.log('reverseGeocodeCoordinate',location)
    return new Promise<GeoResponse>(resolve => {
      this._geoCoder.getAddress([location.longitude,location.lattitude], function(status:any, result:any) {
        if (status === 'complete' && result.info === 'OK') {
            resolve(self._parseGeocodeResult(status,result.regeocode))
        }else{
          return Promise.reject({
            status:status,
            result:null,
            error:result.info
          } as GeoResponse)
        }
      })
    })

  }

  private _parseGeocodeResult = (status:string,value:any) => {
    return {
      status:status,
      result:{
        address:[
          {
            info:{
              province:value.addressComponent.province,
              city:value.addressComponent.city,
              street:value.addressComponent.street,
              district:value.addressComponent.district,
              postcode:value.addressComponent.citycode,
            },
            formatedAddress:value.formattedAddress
          },
        ]
      }
    } as GeoResponse
  }


}

export default GDGeocoder
