/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,memo} from 'react';
import {Tag} from './Template'
import {Input,Form} from 'antd';
import styled from 'styled-components';

const Content = styled.p`
margin:0;
font-family: PingFangSC-Semibold;
font-size: 14px;
color: #333333;
letter-spacing: 0;
margin-bottom: 15px;
font-weight: 600;
`
const StyleFormItem = styled(Form.Item)`
margin-bottom:0;
`
const StyledInput = styled(Input)`
margin-bottom:15px;
width: 23vw;
height: 50px;
background: #FFFFFF;
border: 1px solid rgba(151,151,151,1);
border-radius: 4px;
`

const StyledTextArea = styled(Input.TextArea)`
margin-bottom:15px;
width: 23vw;
height: 50vh;
background: #FFFFFF;
border: 1px solid rgba(151,151,151,1);
border-radius: 4px;
flex:1 0 auto;
`
const App:FunctionComponent<{planNum:string,name:string,desc?:string}> = (props) => {

  return(
    <div>
    <Tag name={'预案编码'}/>
    <Content>{props.planNum}</Content>
    <Tag name={'预案名称'}/>
    <Content>{props.name}</Content>
    <Tag name={'预案描述'}/>
    <Content style={{width:'23vw' }}>{props.desc}</Content>
    </div>
  )
}


const StyledDiv = styled.div`
display:flex;
flex-direction:column;
height:100%;
`
export const CreateBasic:FunctionComponent<{form:ReturnType<typeof Form.useForm>}> = (props) => {
  const [form] = props.form
  const onChange = (val,name)=>{
    console.log(val.target.value,name)
    form.setFieldsValue({name:val.target.value})
    console.log(form.getFieldsValue())
  }
  return(
    <StyledDiv>
    <Tag name={'预案编码'}/>
    <Form.Item name={'planNum'} rules={[{ required: true, message: '预案编码不能为空' }]} >
      <StyledInput placeholder={'请输入自定义名称'} />
    </Form.Item>

    <Tag name={'预案名称'}/>
    <Form.Item name={'planName'} rules={[{ required: true, message: '预案名称不能为空' }]} >
      <StyledInput placeholder={'请输入自定义名称'} />
    </Form.Item>
    <Tag name={'预案描述'}/>
      <Form.Item name={'planDesc'} rules={[{ required: true, message: '预案描述不能为空'  }]} >
        <StyledTextArea autoSize = {{ minRows: 6, maxRows: 8 }} placeholder={'请输入自定义名称'}/>
      </Form.Item>
    </StyledDiv>
  )
}
export default memo(App)
