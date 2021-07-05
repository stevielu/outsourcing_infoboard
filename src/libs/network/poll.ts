/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/



export default class Poll<T>{
  public pollingTaskId:number = 0
  constructor(

  )
  {

  }

  subscribe = (excuter:(value:T) => void) =>{

  }
  // next = <TResult1 = T, TResult2 = never>(fullfill?:((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,reject?:((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null) =>{
  //   super.then(fullfill,reject)
  //   return this
  // }


}
