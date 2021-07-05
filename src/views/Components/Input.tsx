/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import {Input} from 'antd'
import styled from 'styled-components';


const StyledInput = styled(Input)`
  margin:${props => props.theme.margin} 0 ${props => props.theme.margin} 0 !important;
`
export const CustomizeInput = (props:any) => {
  return (
    <StyledInput placeholder={props.placeholder} {...props}/>
  )

}
