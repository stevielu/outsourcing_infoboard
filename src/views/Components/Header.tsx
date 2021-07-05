/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react'
import styled from 'styled-components';
import { Row } from 'antd';


const StyledRow = styled(Row)`
  min-height:64px;
  padding: 0 !important;
  margin:${props => props.theme.veticalSpacing};
`


/********************Elements *********************/
const HeaderRow:FunctionComponent = (props) => {
  return (
    <StyledRow >
      {props.children}
    </StyledRow>
  )
}

export default HeaderRow
