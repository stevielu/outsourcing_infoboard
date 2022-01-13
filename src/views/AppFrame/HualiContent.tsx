/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{useCallback} from 'react';
import { useSelector } from 'react-redux';
import { MenuRoute} from './d';
import { Switch ,Redirect} from 'react-router-dom';
import menuParser from './MenuParser'

const HualiContent = ({ config }: { config: MenuRoute }) => {
  let routes:JSX.Element[] = []
  const loginState = useSelector((state:any)=>{
    return state['auth']
  })
  const getContens = useCallback(()=>{
    return menuParser(config,routes)
  },[])
  return(
    <Switch>
      {getContens()}
       <Redirect from={'/'} to ={'/show'}/>


    </Switch>
  )

}

export default HualiContent;
