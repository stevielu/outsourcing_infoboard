import React from 'react';
import {Select} from 'antd';
export const genOptions = ()=>{
  let arrs:Array<JSX.Element> = []
  for(let i =1;i<=99;i++){
    arrs.push( <Select.Option value={i}>{i}</Select.Option>)
  }
  return arrs
}
