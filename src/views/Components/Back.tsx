import { BackIcon } from "./Icon"
import React,{FunctionComponent  } from 'react'
import { Link } from "react-router-dom";

type BackProps = {
  href:string;
  title?:string;
}


const BackButton:FunctionComponent<BackProps> = (props) => {
  return(
    <Link to = {props.href}>
      <BackIcon>{props.title}</BackIcon>
    </Link>
  )
}

export default BackButton
