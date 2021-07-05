/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{useEffect,FunctionComponent,useState} from 'react'
import {weatherCode} from '../../assets/weather'
import { Container } from '../../libs/base/base-style'
import styled from 'styled-components'
type WeatherProps = {
  city:string;
  apiKey:string;
}
const StyledImg = styled.img`
position:absolute;
right:220px;
top:0;
bottom:0;
margin: auto;
`
const App:FunctionComponent<WeatherProps> = (props) => {
  const [content,setContent] = useState<JSX.Element>()
  useEffect(()=>{
    // const content = Api.weather.getGaodeWeather({
    //   city:props.city,
    //   key:props.apiKey
    // }).then(res=>{
    //   if(res){
    //     setContent(res.image)
    //   }
    // })
  },[])

  return (
    <Container {...props}>
      <StyledImg src ={weatherCode['多云']}/>
    </Container>
  )
}

export default App
