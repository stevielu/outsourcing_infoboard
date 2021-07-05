/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import { Coordinates2D,Coordinate2DInvalid } from './common';
import {MapInstance} from './map-object'
import MapOverlay from './map-overlay'

export default class CanvasLayer implements MapOverlay{
  map?:MapInstance
  extData?:any;
  position?:Coordinates2D = Coordinate2DInvalid
  layerObject?:any
  constructor(init:{map:MapInstance,layerObject:any,position?:Coordinates2D,extData?:any}){
    Object.assign(this,init)
  }
}
