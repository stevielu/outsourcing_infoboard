/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react'
import logo from '../../assets/common/logo.png'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`
interface LogoProps{
  src?:string;
  title?:string;
  conternt?:string;
  layout?:'left'|'center'|'right';
}
export const LogoImg:FunctionComponent<LogoProps> = (props) => {
  return (
    <Container style={{justifyContent: props.layout ?props.layout: 'center'}}>
      <img src = {props.src ?props.src:logo} {...props}></img>
    </Container>

  )
}
