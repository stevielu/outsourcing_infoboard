/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {ContentFont,Container,HeadFont,TitleFont } from '../../libs/base/base-style'
import styled from 'styled-components';
const Wrapper = styled(Container)`
    display: flex;
    align-items: center;
    border-radius:6px;
    background:#393550;
    margin:20px;
    height:150px;
    width:100%;
`
const Item = styled(Container)`
  display: flex;
  flex-direction:row;
`
const Name = styled(TitleFont)`
  color:#fff;
`
export enum StepStatus{
  Done = '0',
  Progressing = '1',
  Ready = `2`
}
type Props = {
  steps:{
    name:string;
    status:StepStatus
  }[]
}
const App:FunctionComponent<Props> = (props) => {
  return(
    <Wrapper>
      <Item>
        <Name>第一阶段</Name>
      </Item>

    </Wrapper>
  )
};


export default App
