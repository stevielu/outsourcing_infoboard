/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import Main from '../Components/Main'
import Title from './Title'
import styled from 'styled-components';


const headInfo = {
  title:'通知中心',
  author:"张三",
  createTime:"2022/01/04 11:41"
}


const App:FunctionComponent = (props) => {
  return(
    <Main title={<Title {...headInfo}/>}>

    </Main>
  )

};

export default App
