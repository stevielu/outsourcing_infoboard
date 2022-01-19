/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {ContentFont,Container,HeadFont,TitleFont } from '../../libs/base/base-style'
import styled from 'styled-components';
const StyleHeader = styled(Container)`
    display: flex;
    align-items: center;
`
const App:FunctionComponent<{title:string;author:string;createTime:string}> = (props) => {
  return(
    <StyleHeader>
      <HeadFont style={{marginRight:'auto'}}>{props.title}</HeadFont>
      <ContentFont style={{marginLeft:'auto'}}>创建人：{props.author}</ContentFont>
      <ContentFont style={{marginLeft:'auto'}}>创建时间：{props.createTime}</ContentFont>
    </StyleHeader>
  )
};


export default App
