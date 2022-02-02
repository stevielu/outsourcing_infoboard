/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import {ContentFont,Container,HeadFont,TitleFont } from '../../libs/base/base-style'
import styled from 'styled-components';
import { Input,Form } from 'antd';
const Wrapper = styled(Container)`
    display: flex;
    align-items: center;
    border-radius:6px;
    background:#393550;
    height:150px;
    width:100%;
    margin-bottom:25px;
`
const Item = styled(Container)`
  display: flex;
  flex-direction:column;
  align-items: center;
  min-width: 200px;
  flex:1;
`
const Name = styled(TitleFont)`
width: 56px;
height: 20px;
font-size: 14px;
color: #FFFFFF;
text-align: center;
font-weight: 600;
margin-bottom:10px;
`

const Circle = styled.div`
width: 24px;
height: 24px;
border-radius:12px;
background: #7C7799;
border: 3px solid #59537E;
outline: 4px solid #393550;
z-index: 1;
`

const HinterWrapper = styled.div`
display:flex;
flex-direction:row;
align-items: center;

width: 100%;
`
const Bar = styled.div`
height: 8px;
flex:1;
min-width: 88px;
z-index:0;
background:#676282;
`

const StyledInput = styled(Input)`
  max-width:200px;
  margin-top:10px;
  background: #423D5F;
  border: 1px solid #B2AFC7;
  border-radius: 4px;
  color:#fff;
`
const Tips = styled.p`
  max-width:200px;
  margin-top:10px;
  color:#423D5F;
`
export enum StepStatus{
  Done = '0',
  Progressing = '1',
  Ready = `2`
}
export type Steps = {
  name:string;
  status:StepStatus;
  content?:string
}[]
type Props = {
  steps:Steps
  onChange?:(value:Steps)=>void
}

const bgColor = (sta:StepStatus) => {
  switch(sta){
    case StepStatus.Ready:
      return {background:"#423D5F"}
    case StepStatus.Done:
      return {background:"#5A76FF"}
    case StepStatus.Progressing:
      return {background:"#E7980C"}
    default:return {background:"#423D5F"}
  }
}
const font = (sta:StepStatus) => {
  switch(sta){
    case StepStatus.Ready:
      return {content:'未開始',color:"#7C7799"}
    case StepStatus.Done:
      return {content:'已完成',color:"#5A76FF"}
    case StepStatus.Progressing:
      return {content:'處理中',color:"#E7980C"}
    default:return {content:'未開始',color:"#7C7799"}
  }
}
const App:FunctionComponent<Props> = (props) => {
  const [form] = Form.useForm()
  const cancelSteps = () => {
    // console.log(formRef.current?.target)
   //formRef && formRef.current?.target
   //
   form.resetFields()
  }

  const stepMemp = React.useMemo(()=>{
    cancelSteps()
    return props.steps
  },[props.steps])

  const changeFn = React.useCallback((val)=>{
    const current = stepMemp.find(step => step.name === val.target.id)
    if(current){
       current.content = val.target.value
    }
    props.onChange && props.onChange(stepMemp)
  },[stepMemp])



  return(
    <Wrapper>
      <Form style={{display: 'contents'}} form={form}>
      {props.steps.map((item,index) => {
        return (
          <Item>
            <Name>{item.name}</Name>
            {props.steps.length === 1? <Circle style={bgColor(item.status)}/>:<HinterWrapper><Bar style={{background:`${index===0?"transparent":" #676282"}`}}/>  <Circle style={bgColor(item.status)}/><Bar style={{background:`${index===props.steps.length-1?"transparent":" #676282"}`}}/></HinterWrapper>
}
            {props.onChange ? <Form.Item style={{display: 'flex'}} name={item.name}>
              <StyledInput id = {item.name} key={item.name} minLength = {4} maxLength={20} onChange={changeFn}/>

            </Form.Item>:<Tips style={{color:font(item.status).color}}>{font(item.status).content}</Tips>
            }

          </Item>

        )
      })}
      </Form>
    </Wrapper>
  )
};


export default App
