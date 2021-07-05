/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import AuthModule from './auth'
import TaskModule from './task'
// 接口对象，为配合之前MockJS规范，定义该接口
export interface MockApi {
  url: string | RegExp
  type: 'get' | 'post' | 'put' | 'delete'
  data:
    | {
        code: number
        msg: string | null
        data?: any
      }
    | Function
  description?: string
}

export default [...AuthModule,...TaskModule]
