import {RollbackOutlined} from '@ant-design/icons'
import React,{FunctionComponent  } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
type BackProps = {
  href:string;
  title?:string;
}

const Header = styled.div`
    display: flex;
    flex-direction:column;
    height: 80px;
    border-bottom: 1px;
    border-bottom-style: groove;
    border-bottom-color: #cbcbcb21;
    font-size: 30px;
    color: #393550;
    letter-spacing: 0;
    font-weight: 600;
    justify-content: center;
    margin-left:23px;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const BackButton:FunctionComponent<BackProps> = (props) => {
  return(
    <StyledLink to = {props.href}>
      <RollbackOutlined style={{color:'#393550'}}/>
      <Header>{props.title}</Header>
    </StyledLink>
  )
}

export default BackButton
