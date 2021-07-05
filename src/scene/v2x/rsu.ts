/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useState,} from 'react'
import { Direction} from '../../libs/map/map-light'
import { Coordinates2D} from '../../libs/map/common'
import * as Api from '../../api'
import {useRequest} from '../../libs/'

const {spat,crossing} = Api.rsu


export type CrossConfig = {
  position:Coordinates2D;
  rotation:number;
  crossingNumber:number|string;
  radius:number;
  lightType:{
    direction:Direction;
    phase: number;
    type?:string;//arrow or circle
  }[]
  key:string;
}

export const useSpat = () => {
  const crossingNumber = useRequest(crossing.list)
  const crossingConfigs = useRequest(crossing.get)
  const [spatConfig,setSpatConfig] = useState<{[name:string]:CrossConfig[]}>({})
  let configList:{[name:string]:CrossConfig[]} = {}

  const directionFormatter = (str:string)=>{
    switch(str){
      case 'L':
        return Direction.Left
      case 'R':
        return Direction.Right
      case 'D':
        return Direction.Straight
      case 'U':
        return Direction.UTurn
      case 'C':
          return Direction.Circle
      default:
        return Direction.Unknown

    }
  }
  const fetchConfig = async () => {
    // spat.getSpat(collectData)

    const crossNoList = await crossingNumber.request()
    if(crossNoList.result){
      const intersList = crossNoList.result.list
      intersList.forEach(async (value)=>{
        const data = await crossingConfigs.request(value.intersNo)
        if(data.result){
          configList[value.intersNo] = data.result.signalConfList.map(item => {
            return {
              position:{lattitude:item.latitude,longitude:item.longitude},
              rotation:item.angle,
              crossingNumber:value.intersNo,
              lightType:item.lampPhaseList.map(item => {
                return {
                  direction:directionFormatter(item.lampType),
                  phase:item.phase
                }
              }),
              radius:10,
              key:item.id,
            }
          })
          setSpatConfig({...configList})
        }
      })
    }

  }



  return {fetchConfig,spatConfig,spat}
}

export default {useSpat}
