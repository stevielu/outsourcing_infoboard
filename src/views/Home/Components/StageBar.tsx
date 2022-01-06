import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Tooltip } from 'antd';
import { Container,TitleFont } from '../../../libs/base/base-style'
import down from './asset/down.svg'
import right from './asset/right.svg'
export enum Stage{
  Done = 2,
  InProgress = 1,
  Initial = 0,
}
export type NavigatorProps = {
  title:string;
  activate:Stage;
}
const StageColor = {
  [Stage.Done]:'#FFB685',
  [Stage.InProgress]:'#FA6400 ',
  [Stage.Initial]:'#EDEDED ',
}
const TitleColor = {
  [Stage.Done]:'#FA6400',
  [Stage.InProgress]:'#FFFFFF',
  [Stage.Initial]:'#999999 ',
}
const Step = styled(Container)`
  min-width:200px;
  height:36px;
  border-radius:3px;
  margin-right: 6px;
  flex:1;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Icon = styled.img`
  width:24px;
  margin-right: 21px;
  margin-left: auto;
`

const Content = styled(TitleFont)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left:17.5px;
`
const StepBar:FunctionComponent<NavigatorProps> = (props) => {
  return(
    <Step style = {{backgroundColor:StageColor[props.activate]}} >
      <Tooltip title={props.title}>
        <Content color = {TitleColor[props.activate]}>{props.title} </Content>
      </Tooltip>
      <Icon src = {props.activate == Stage.InProgress?down:right}/>
    </Step>
  )
}
export default StepBar
