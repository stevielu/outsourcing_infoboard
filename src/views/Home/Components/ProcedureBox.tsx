import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Tooltip,Button } from 'antd';
import { Container,ContentFont } from '../../../libs/base/base-style'
import UUID from '../../../utils/uuid'
export enum Status{
  Limited = 3,
  Done = 2,
  InProgress = 1,
  Initial = 0,
}
export type ProcedureProps = {
  title:string;
  status:Status;
}
const StatusColor = {
  [Status.Done]:'#DEF5FF',
  [Status.InProgress]:'#157BF7',
  [Status.Initial]:'#F2F2F2',
  [Status.Limited]:'#666666',
}
const TitleColor = {
  [Status.Done]:'#333333',
  [Status.InProgress]:'#FFFFFF',
  [Status.Initial]:'#333333',
  [Status.Limited]:'#CCCCCC',
}
const Box = styled(Container)`
  width:97.87px;
  height:62px;
  border-radius:3px;
  margin-right:6px;
  margin-top:6px;
  flex:1;
  display: flex;
  padding: 5px;
`


const Content = styled(ContentFont)`
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const App:FunctionComponent<ProcedureProps> = (props) => {
  return(
    <Box style = {{backgroundColor:StatusColor[props.status]}} key={UUID.get()} {...props}>
      <Tooltip title={props.title}>
        <Content color = {TitleColor[props.status]}>{props.title} </Content>
      </Tooltip>
    </Box>
  )
}
export default App
