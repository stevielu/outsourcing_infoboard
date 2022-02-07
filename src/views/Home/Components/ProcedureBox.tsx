import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Tooltip,Button } from 'antd';
import { Container,ContentFont } from '../../../libs/base/base-style'
import UUID from '../../../utils/uuid'
export enum Status{
  Done = 2,
  InProgress = 1,
  Initial = 0,
}
export type ProcedureProps = {
  title:string;
  status:Status;
  pid:number|string;
  tally:string;
}
const StatusColor = {
  [Status.Done]:'#FFF',
  [Status.InProgress]:'#FA6400',
  [Status.Initial]:'#BFBEBE',

}
const TitleColor = {
  [Status.Done]:'#6770FC',
  [Status.InProgress]:'#FFFFFF',
  [Status.Initial]:'#FFF',

}
const CircleColor = {
  [Status.Done]:'#6770FC',
  [Status.InProgress]:'#FFDDC7',
  [Status.Initial]:'#747576',

}
const TagTitleColor = {
  [Status.Done]:'#FFF',
  [Status.InProgress]:'#FA6400',
  [Status.Initial]:'#FFF',

}
const TagColor = {
  [Status.Done]:'#8F95FF',
  [Status.InProgress]:'#FF944C',
  [Status.Initial]:'#F9F3F3',

}
const Box = styled(Container)`
  max-width:228px;
  min-width:194px;
  height:60px;
  border-radius:3px;
  display: flex;
  align-items: center;
  flex-direction:row;
  border:1px solid grey;
`


const Content = styled(ContentFont)`
  display: -webkit-box;
  max-width: 157px;
  min-width: 50px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-left: 5px;
  font-size:0.37vw;
`
const Pid = styled(Container)`
  display: flex;
  align-items: center;
  border: 1px solid grey;
  height: 60px;
  border-radius: 3px;
  margin: -1px;
  background:#8F95FF;
`
const Circle = styled(Container)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 5px;
  background: #7c2aff;
  color: #fff;
  text-align: center;
  font: 12px Arial, sans-serif;
  display: flex;
  align-items: center;
  `
const IDContent = styled(ContentFont)`
width: 100%;
`
const TallyContent = styled(ContentFont)`
  background-color: #52c41a;
  padding-left: 2px;
  padding-right: 2px;
  color: white;
  margin-right: 5px !important;
  border-radius:3px;
`
const App:FunctionComponent<ProcedureProps> = (props) => {
  return(
    <Box style = {{backgroundColor:StatusColor[props.status],borderColor:TagColor[props.status]}} key={UUID.get()} {...props}>
      <Pid style = {{backgroundColor:TagColor[props.status],borderColor:TagColor[props.status]}} >
        <Circle style = {{backgroundColor:CircleColor[props.status]}}>
          <IDContent color = {TagTitleColor[props.status]}>{props.pid}</IDContent>
        </Circle>
      </Pid>
      <Tooltip title={props.title}>
        <Content color = {TitleColor[props.status]}>{props.title} </Content>
      </Tooltip>
      <TallyContent style = {{backgroundColor:CircleColor[props.status]}}>{props.tally}</TallyContent>
    </Box>
  )
}
export default App
