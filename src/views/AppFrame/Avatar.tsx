/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import styled from 'styled-components'
import { Container,TitleFont,DisabledContent} from '../../libs/base/base-style'
import avatar from '../../assets/common/avatar.png'
const Box =  styled(Container)`
display:flex;
flex-direction:column;
align-items: center;
margin: auto;
`
const Avatar = styled.img`
  width:100%;
  height:100%;
`
const App:React.FunctionComponent<{
  name:string;
  subTitle?:string;
  icon?:string;
}> = (props) =>  {
  return(
    <Box {...props}>
      <Avatar src = {avatar}/>
      <TitleFont>{props.name}</TitleFont>
      {props.subTitle && <DisabledContent>{props.subTitle}</DisabledContent>}
    </Box>
  )
}

export default App
