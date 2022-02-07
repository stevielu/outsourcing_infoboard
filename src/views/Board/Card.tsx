/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {Button} from 'antd'
import {RollbackOutlined} from '@ant-design/icons'
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
    margin-bottom: 10px;
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
align-items: center
`
const Wrapper = styled.div`
display:flex;
flex-direction:row;
min-height:60px;
align-items:flex-start;
width:100%;
margin-bottom: 10px;
`

const Img = styled.img`
width:29px;
`

const UserName = styled.p`
font-size: 12px;
color: #393550;
margin:0;
margin-top:auto;
`
const GreyFont = styled.p`
font-size: 12px;
color: #A49FBF;
font-weight: 400;
margin:0;
`
const MessageWrapper = styled.div`
flex: 1;
height: 58px;
background: #E0F3FC;
border-radius: 0px 8px 8px 8px;
margin-left: 11px;
padding: 8px 10px 8px 10px;
width: 100%;
`
const ContentsWrapper = styled(Body)`
width: 100%;
overflow-y: auto;
overflow-x: hidden;
max-height: 280px;
flex-wrap: wrap;
flex-direction: row;
`

const Footer = styled.div`
display:flex;
flex-direction:row;
align-items: center;
`

const DelBtn = styled(Button)`
width: 29px !important;
height: 15px !important;
background: #ADD6E9;
border-radius: 3px;
border:none;
color:#fff;
margin-left:auto;
&:focus{
  background: #ADD6E9 !important;
  color:#fff;
}
&:hover{
  background: #1845FF !important;
  border-color:#1845FF !important;
  color:#fff;
}
`
type Message = {
  user:string;
  message:string;
  creteTime:string;
  id:string;
}

const Item:FunctionComponent<Message> = (props) => {
  const [visible,setVisible] = React.useState(true)
  return (
    <>
    {visible === true &&  <Wrapper>
        <Body>
          <Img src={avatar_ico}/>
          <UserName>{props.user}</UserName>
        </Body>
        <Body style={{flex:1}}>
          <MessageWrapper>
          <UserName>{props.message}</UserName>
          <Footer>
            <GreyFont>{props.creteTime}</GreyFont>
            <DelBtn type="primary"  icon={<RollbackOutlined />} size={'small'} onClick={() => setVisible(false)}/>
          </Footer>
          </MessageWrapper>

        </Body>
      </Wrapper>

    }
    </>
  )
}
export const Contents:FunctionComponent<{dataSource:Message[]}> = (props) => {
  return(
    <ContentsWrapper>
    {props.dataSource.map(item => {
      return(
        <Item {...item}/>
      )
    })}

    </ContentsWrapper>
  )
}

const Main:FunctionComponent<{
  title:string;
  id:string;
  contents:Message[]
}> = (props) => {
  return(
    <Container >
      <Header>  {props.title}</Header>
      <Contents dataSource={props.contents}/>
    </Container>
  )
}

export default Main
