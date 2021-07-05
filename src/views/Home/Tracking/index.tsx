/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {OnBoardUnit} from '../../../libs/map'
import MapInterface from '../../../libs/map/map-core'

import * as Api from '../../../api/'

const OBUApi = Api.bsm
interface MapProps{
  map:MapInterface
}
const Vehicle:FunctionComponent<MapProps> = (props) => {
  return (
      <OnBoardUnit
        mapView = {props.map}
        updateMotion = {OBUApi.getVehicle}
        service = {['V2X']}
        offset = {{x:0,y:0}}

      />
  )

};

export default Vehicle
