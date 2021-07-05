/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react'
import { IconButton } from '../../libs/base/base-style'
import {Container } from '../../libs/base/base-style'
import { FullscreenOutlined } from '@ant-design/icons';


/********************Elements *********************/
interface FullScreenProps{
  icon?:JSX.Element;
  target:any;
  title?:string;
}

const FullScreen:FunctionComponent<FullScreenProps> = (props) => {


  const fullScreen = () => {
    console.log(props.target)
    if(props.target){
      if(props.target.requestFullscreen){
        props.target.requestFullscreen()

      }
    }
  }

  return (
    <Container>
      <IconButton icon = {props.icon ?props.icon:<FullscreenOutlined/>} onClick = {fullScreen} {...props}>{props.title}</IconButton>
      {props.children}
    </Container>
  )
}



export default FullScreen
