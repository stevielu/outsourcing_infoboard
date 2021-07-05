/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React from 'react'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';


export default ({children}:{children?:any}) => {
  const icon = <LoadingOutlined/>
  return (
    <Spin indicator = {icon}>
    {children}
    </Spin>
  )

}
