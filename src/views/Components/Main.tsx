import { BackIcon } from "./Icon"
import React,{FunctionComponent  } from 'react'
import { Link } from "react-router-dom";
const Container = styled.div`
  min-height: 768px;
  padding: 100px;
  margin: 30px 30px 30px 0px;
  background: #f0f0f0;
  border-radius: 12px;

`

type Props = {
  header:Reaxt.JSX.Element;
}


const BackButton:FunctionComponent<BackProps> = (props) => {
  return(
    <Link to = {props.href}>
      <BackIcon>{props.title}</BackIcon>
    </Link>
  )
}

export default BackButton
