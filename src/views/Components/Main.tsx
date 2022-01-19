
import React,{FunctionComponent  } from 'react'
import styled from 'styled-components';
const Container = styled.div`
    min-height: 768px;
    margin: 30px 30px 30px 0px;
    background: #f5f5fd;
    border-radius: 12px;
    display: flex;
    align-items: center;
    width: 100vw;
    flex-direction: column;
    padding: 20px;
`
const Divider = styled.div`

    height: 1px;
    opacity: 0.23;
    border: 1px solid #979797;
    width:100%;
    margin:5px;
    margin-top: auto;
`
const Header = styled.div`
    display: flex;
    flex-direction:column;
    height: 80px;
    width: 100%;
    border-bottom: 1px;
    border-bottom-style: groove;
    border-bottom-color: #cbcbcb21;
    font-size: 30px;
    color: #393550;
    letter-spacing: 0;
    font-weight: 600;
    justify-content: center;
`
type Props = {
  title:JSX.Element|string;
}


const Main:FunctionComponent<Props> = (props) => {
  return(
    <Container >
      <Header>  {props.title}</Header>
      {props.children}
    </Container>
  )
}

export default Main
