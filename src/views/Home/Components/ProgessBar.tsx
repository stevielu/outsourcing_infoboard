import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Container,ContentFont } from '../../../libs/base/base-style'


export type ProgressProps = {
  complete:string;
  activated:string;
  unactived:string;
}

const Step = styled(Container)`
  width:100%;
  height:12px;
  border-radius:6px;
  margin-top: 5px;
  flex:1;
  display: flex;
  flex-direction: row;
  align-items: center;

`
const CompleteBar = styled(Container)`
  background:#6871FC;
  height:12px;
  border-radius:6px;
  display: flex;
  flex-direction: row;
  align-items:center;
  z-index:3;
`
const ActivatedBar = styled(Container)`
  background:#FA6400;
  height:12px;
  border-radius:6px;
  display: flex;
  flex-direction: row;
  align-items:center;
  margin-left:-9px;
  z-index:2;
`
const InActivatedBar = styled(Container)`
  background:#BFBEBE ;
  height:12px;
  border-radius:6px;
  display: flex;
  flex-direction: row;
  align-items:center;
  margin-left:-9px;
  z-index:1;
`
const Value = styled(ContentFont)`
  font-size: 10px;
  margin-left: auto !important;
  padding-right: 5px;
  color: white;
  line-height: 12px;
`
const StepBar:FunctionComponent<ProgressProps> = (props) => {
  return(
    <Step >
      <CompleteBar style={{width:`${props.complete}`}}>
        <Value>{props.complete}</Value>
      </CompleteBar>
      <ActivatedBar style={{width:`calc(${props.activated})`}}>
        <Value>{props.activated}</Value>
      </ActivatedBar>
      <InActivatedBar style={{width:`calc(${props.unactived})`}}>
        <Value>{props.unactived}</Value>
      </InActivatedBar>
    </Step>
  )
}
export default StepBar
