/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useState} from 'react';

/*
编辑 解锁输入框
Parameter @Value 输入框初始值
Return @handle 返回给触发事件对象的回调，如目标Click处理；item为待解锁的Input对象 @setUnlock 手动解锁输入框disable 属性
*/
export const useUnlockEditor = (value:string)=>{
  const [unlock,setUnlock] = useState(true)
  const handle = (item:any) => {
    setUnlock(!unlock)
    if(item){
      if(unlock == false && item.current != undefined){
        item.current.state.value = value
      }
    }

  }
  return {unlock,handle,setUnlock}
}
