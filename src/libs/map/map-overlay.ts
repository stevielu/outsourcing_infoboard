/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {MapInstance} from './map-object'

interface MapOverlay{
  map?:MapInstance|null;
  extData?:any;
  show?:()=>void;
  hide?:()=>void
}

export default MapOverlay
