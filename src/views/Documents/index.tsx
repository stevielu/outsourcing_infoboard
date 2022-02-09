/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import { Table,Tag} from 'antd';
import {ActionButton} from '../../libs/base/base-style'
import {Input,Form} from 'antd'
import Modal,{useModal} from '../Components/Modal'
import Main from '../Components/Main'
import {EditBar} from '../Components/'
import UUID from '../../utils/uuid'
import styled from 'styled-components';
const HeadFont = styled.p`
font-family: PingFangSC-Semibold;
font-size: 30px;
color: #393550;
letter-spacing: 0;
line-height: 42px;
font-weight: 600;
width:300px;
margin: 0;
text-align: left;
`
const BluleFont = styled.p`
font-family: PingFangSC-Semibold;
font-size: 30px;
color: #3D1CFE;
letter-spacing: 0;
text-align: center;
line-height: 42px;
font-weight: 600;
display:contents;

`

const GreenFont = styled(BluleFont)`
color: #00CF1C;
`
const Wrapper = styled.div`
  display:flex;
  align-items:left;
  align-items: center;
`
const CreateButton = styled(ActionButton)`
margin-left:auto;
`

const StyleFormItem = styled(Form.Item)`
margin-bottom:20px;
`
const StyledForm = styled(Form)`
width:100%;
margin-left: 10px;
`

const status = {
  total:3,
}



const Update = (props:{datasource:{name:string;notes:string};visible:boolean;closeModal:()=>void}) => {
  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  React.useEffect(()=>{
    form.setFieldsValue({...props.datasource})
  },[props.datasource])
  return <Modal title={'编辑文档'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <StyleFormItem name={'name'} label={'文档名词'} required initialValue = {props.datasource.name}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'notes'} label={'文档备注'} required initialValue = {props.datasource.notes}>
      <Input.TextArea maxLength={100} showCount/>
    </StyleFormItem>

  </StyledForm>
  </Modal>
}


const Add = (props:{visible:boolean;closeModal:()=>void}) => {

  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  return <Modal title={'创建文档'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <StyleFormItem name={'name'} label={'文档名词'} required>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'notes'} label={'文档备注'} required>
      <Input.TextArea maxLength={100} showCount/>
    </StyleFormItem>

  </StyledForm>
  </Modal>
}
const Header:FunctionComponent<{total:number;}> = (props) => {
  const {visible,showModal,closeModal} = useModal()

  return (
    <Wrapper >
      <HeadFont>文档总数 ：<BluleFont>{props.total}</BluleFont></HeadFont>
      <CreateButton onClick={showModal} > 创建</CreateButton>
      <Add closeModal = {closeModal} visible = {visible}/>
    </Wrapper>
  )
}


const StyledTable = styled(Table)`
margin-top:28px;
margin-bottom:28px;
width:100%;
`
const App:FunctionComponent = (props) => {
  const {visible,showModal,closeModal} = useModal()
  const [form] = Form.useForm()
  const [currentCell,setCurrentCell] = React.useState<{name:string;notes:string;}>()
  const dataSource = [
  {
    key: '1',
    name: 'rtewr',
    notes: '23121222ssss',
    author:'胡彦斌',
    createTime:'20210-12-31',
  },
  {
    key: '2',
    name: 'rtewr',
    notes: '23121222ssss',
    author:'胡彦斌',
    createTime:'20210-12-31',
  },
  {
    key: '3',
    name: 'rtewr',
    notes: '23121222ssss',
    author:'胡彦斌',
    createTime:'20210-12-31',
  },
  ];

  const columns = [
  {
    title: '文档名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '文档备注',
    dataIndex: 'notes',
    key: 'notes',
  },
  {
    title: '创建人',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render:(text:any,record:any) => (
                  <EditBar action={{
          delete:{
              handle:()=>{}
          },
          edit:{
              handle:(item)=>{
                setCurrentCell(item)
                showModal()
              }
          },

      }} item={record}/>
              )
  },
  ];


return(
  <Main title={<Header {...status}/>}>

  <StyledTable dataSource={dataSource} columns={columns} />;
  {currentCell && <Update datasource = {currentCell} closeModal = {closeModal} visible = {visible}/>}
  </Main>
)

};
export default App
