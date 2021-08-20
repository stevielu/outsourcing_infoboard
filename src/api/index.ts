/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Network from '../libs/network/network-provider'
import NetworkFactory from '../libs/network/network-factory'
import * as RSUApi from './rsu'
import * as BSMApi from './bsm'
import * as V2XApi from './scene'
import GeoApi from './geo'
import WeatherApi from './weather'
import * as Base from '../model/response'
const networkFactory = new NetworkFactory()
const net = networkFactory.makeNetwork()


export const weather = WeatherApi(net)
export const geo = GeoApi(net)
export const rsu =  {
  spat:RSUApi.Spat(networkFactory.makeWebSocket('spat')),
  crossing:RSUApi.CorssingInfo(net)
}
export const bsm = BSMApi.BSM(networkFactory.makeWebSocket('bsm'))
export const v2x = V2XApi.V2XScene(networkFactory.makeWebSocket('v2x'))

export interface ListAPI<T>{
  list:(data?:any) => Promise<Base.PageObj<T>|undefined>,
  get:(id?:any) => Promise<T|undefined>,
  add:(id?:any) => Promise<any>,
  update:(params?:any) => Promise<any>,
  delete:(id?:any) => Promise<any>,
}

export type SearchAPI<T> = (data:any) => Promise<Base.PageObj<T>|undefined>
