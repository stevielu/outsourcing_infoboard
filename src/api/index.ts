/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Network from '../libs/network/network-provider'
import NetworkFactory from '../libs/network/network-factory'
import DeptApi from './dept'

import * as Base from '../model/response'
const networkFactory = new NetworkFactory()
const net = networkFactory.makeNetwork()



export const dept = DeptApi(net)



export interface ListAPI<T>{
  list:(data?:any) => Promise<Base.PageObj<T>|undefined>,
  get:(id?:any) => Promise<T|undefined>,
  add:(id?:any) => Promise<any>,
  update:(params?:any) => Promise<any>,
  delete:(id?:any) => Promise<any>,
}

export type SearchAPI<T> = (data:any) => Promise<Base.PageObj<T>|undefined>
