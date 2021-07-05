/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{FunctionComponent} from 'react'
import {Alert} from 'antd'
import {FilledInfoCircle} from './Icon'
import styled from 'styled-components';
import {ContentFont,BlueContentFont,Container } from '../../libs/base/base-style'
import Stringfy from '../../utils/stringify'



type AlertProps = {
  title:string;
  desc?:string;
}


/*
带图标 单行提示
*/
const Info:FunctionComponent<AlertProps|any> = (props) => {
  return (
    <Container>
      <FilledInfoCircle/>
      <BlueContentFont>{props.title}</BlueContentFont>
    </Container>
  )
}

/*
不带图标 单行提示
*/
const StyledInfoContainer = styled(Container)`
  position: relative !important;
  border: #C1DCFA 1px solid !important;
  background: #D9F6FF !important;
  padding:0 ${props => props.theme.padding} !important;
`
const InnerInfo:FunctionComponent<AlertProps|any> = (props) => {
  return (
    <StyledInfoContainer {...props}>
      <BlueContentFont>{props.title}</BlueContentFont>
    </StyledInfoContainer>
  )
}


/*
无图标 多行提示
*/
const StyledAlert = styled(Alert)`
  .ant-alert-message{
    font-size: ${props => props.theme.fontSize} !important;
    color: ${props => props.theme.color.blue} !important;
  }
`
const BlueFont = styled(ContentFont)`
  color:${props => props.theme.color.blue} !important;
`

const Instruction:FunctionComponent<AlertProps|any> = (props) => {
  return (
    <StyledAlert message={props.title}
          description={
            <Container>
              {
                Stringfy.NewLine(props.desc,
                  (content) => (<BlueFont>{content}</BlueFont>
                ))
              }
            </Container>
          }
          type="info"
    />
  )
}



export {
  Info,
  InnerInfo,
  Instruction,
}
