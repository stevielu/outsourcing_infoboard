/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { MenuRoute } from './d';
import menuParser from './MenuParser'
import { Switch } from 'react-router-dom';

const HualiTools = ({ config }: { config: MenuRoute }) => {
  let routes:JSX.Element[] = []

  const r = menuParser(config,routes)
  return(
    <Switch>{r}</Switch>
  )
}

export default HualiTools
