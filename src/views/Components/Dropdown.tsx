/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { Dropdown, Button} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'
import styled from 'styled-components';
/********************Layout Style*********************/
const StyleDropBtn = styled(Button)`
  text-align: left !important;
`

const StyleIcon = styled(CaretDownOutlined)`
  text-align: right !important;
`

/********************Elements *********************/
export const DropdownBtn = ({menu,title}:{menu:JSX.Element;title?:string}) => {
  return (
    <Dropdown overlay={menu}>
        <StyleDropBtn block>
           {title}<StyleIcon type="caret-down"/>
        </StyleDropBtn>
    </Dropdown>
  )
}
