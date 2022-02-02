/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {ContentFont,HeadFont,TitleFont } from '../../libs/base/base-style'
import styled from 'styled-components';
import avatar_ico from '../../assets/common/avatar.png'
const Header = styled.div`
    display: flex;
    flex-direction:column;
    height: 60px;
    width: 100%;
    border-bottom: 1px;
    border-bottom-style: groove;
    border-bottom-color: #cbcbcb21;
    font-size: 14px;
    color: #393550;
    letter-spacing: 0;
    font-weight: 600;
    justify-content: center;
`
const Container = styled.div`
    min-height: 320px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    padding-top:0;
`
const Body = styled.div`
display:flex;
flex-direction:column;

`
const Avatar = styled.div`
display:flex;
flex-direction:row;
`

const Img = styled.img`
min-width:29px;
`

const UserName = styled.p`
font-size: 12px;
color: #393550;
margin:0;
`
export const Contents:FunctionComponent<{
  user:string;
  message:string;
  creteTime:string;
  id:string;
}> = (props) => {
  return(
    <Avatar>
      <Img src={avatar_ico}/>
      <UserName>{props.user}</UserName>
    </Avatar>
  )
}

const Main:FunctionComponent<{
  title:string;
  id:string;
}> = (props) => {
  return(
    <Container >
      <Header>  {props.title}</Header>

    </Container>
  )
}

export default Main
