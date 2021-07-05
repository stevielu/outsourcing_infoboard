import React,{FunctionComponent} from 'react'
import {Drawer} from 'antd'
import * as Icon from "./Icon"
import { IconButton  } from '../../libs/base/base-style'
import styled from 'styled-components'
import {useModal} from '../../libs/hooks'

const CollaspeClose = styled(IconButton)`
  position: absolute !important;
  top: 50%;
  right:0;
  width:0 !important;
`

const StyledDrawer = styled(Drawer)`
  height:90% !important;
  top:5% !important;
  .ant-drawer-content{
    overflow:visible !important;
  }
  .ant-drawer-body{
    padding:0 !important
  }
`

const CollapseButton = ({click}:{click:(e:any)=>void})=>{
  return (
    <CollaspeClose icon = {<Icon.ArrowBttunRight/>} onClick = {click}></CollaspeClose>
  )
}

const SideDrawer:FunctionComponent = (props) => {
  const action = useModal()

  return(
    <StyledDrawer
      placement={'left'}
      closable={false}
      visible={action.visible}
      getContainer={false}
      key={'left'}
      style={{ position: 'absolute' }}
      mask={false}
    >
      <CollapseButton click={action.toggle}></CollapseButton>
      {props.children}
    </StyledDrawer>
  )
}
export default SideDrawer
