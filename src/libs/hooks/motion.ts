/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { useEffect} from 'react'
import { createMarker,MarkerMotion} from '../../libs/map'
import MapInterface from '../../libs/map/map-core'

type PathProps = {
  longitude:number;
  lattitude:number;
  heading:number;
  speed:number;
}
type MotionProps = {[name:string]:PathProps}
let motionObjs:{[name:string]:MarkerMotion} = {}

export const useBSMMotion = (view:MapInterface,icon?:JSX.Element,callBack?:(bsm:MotionProps)=>void) => {
  const handle = (bsm:MotionProps) => {
    Object.keys(bsm).forEach(key => {
      if(motionObjs[key]){
        motionObjs[key].motionValue = bsm[key]
      }

      if(!motionObjs[key]){
        const position = {longitude:bsm[key].longitude,lattitude:bsm[key].lattitude}
        const {newMarker} = createMarker(view,
          {
            position:position,
            movePath:bsm[key],
            render:icon
          }
        )

        let newMotion = new MarkerMotion(view,newMarker)
        view.addMarker(newMarker)
        motionObjs[key] = newMotion

      }
    })
    if(callBack){
      callBack(bsm)
    }
  }


  useEffect(()=>{
    return () => {
      motionObjs = {}
    }
  },[])


  return {handle}
}
