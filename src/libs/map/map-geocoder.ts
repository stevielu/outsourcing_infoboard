/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {Coordinates2D} from './common'

export interface AddressComponents{
  country?:string;
  province?:string;
  city?:string;
  street?:string;
  district?:string;
  postcode?:string;
}


export interface Address{
  info:AddressComponents
  formatedAddress:string
  //other linkid, coross id etc
}

export interface GeoResult{
  address:Address[]
}

export interface GeoResponse{
  status:string;
  result:GeoResult|null;
  error?:string
}

interface GeoCoder{
  reverseGeocodeCoordinate:(location:Coordinates2D) => Promise<GeoResponse>
}

export default GeoCoder
