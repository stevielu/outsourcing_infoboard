/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {Coordinates2D,MarkerIcon} from './common'
import MapOverlay from './map-overlay'

export interface InfoWindow extends MapOverlay{
  create:(content:JSX.Element|HTMLElement|null,onOpen?:(context?:InfoWindow)=>void,onClose?:(context?:InfoWindow)=>void)=>void;
  open:(position:Coordinates2D) => void
  close:() => void
  setContent:(content:JSX.Element|HTMLElement|null,onOpen?:(context:any)=>void,onClose?:(context:any)=>void|null) => void
  setAnchor:() => void
  position:Coordinates2D
}

interface Marker extends MapOverlay{
  position:Coordinates2D;
  id?:string;
  title?:string;
  anchor?:string|number;
  icon?:MarkerIcon;
  render?:JSX.Element;
  rotation?:number;
  draggable?:boolean;
  extra?:any;
  setAnchor?:(value:string|number) => void;
  hide?:() => void
  show?:() => void
  getInstance?:() => any
  setPositions:(longtitude:number,lattitude:number) => void
  setAngle:(angle:number) => void
  setLabel:(content:JSX.Element,anchor?:string) => void
  setIcon:(content:JSX.Element) => void
  moveTo:(pathData:{longitude:number,lattitude:number}[],duration:number,complete?:(e:any) => void,animationCallBack?:(e:any) => void) => void
  infoWindow?:InfoWindow
}

export interface MarkerProps{
  position:Coordinates2D;
  id?:string;
  title?:string;
  anchor?:string|number;
  icon?:MarkerIcon;
  render?:JSX.Element;
  rotation?:number;
  draggable?:boolean;
  extra?:any;
  offset?:{x:number;y:number};
  onClick?:(target:Marker) => void;
  infoContent?:JSX.Element|HTMLElement|null;
}


export default Marker
