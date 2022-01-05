/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React from 'react';
import {Map,useMap} from '../../libs/map'
import { Container } from '../../libs/base/base-style'
import config from '../../config'
import styled from 'styled-components'
const Main = styled(Container)`
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  bottom:0;
  display:flex;
`

export default () => {
  const {mapView} = useMap(config.map)
  return (
    <Main>
      <Map type = {config.map} map = {mapView}>
      </Map>
    </Main>
  )

};
