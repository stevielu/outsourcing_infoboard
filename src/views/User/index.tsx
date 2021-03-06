/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import { Table,Tabs} from 'antd';
import {ActionButton} from '../../libs/base/base-style'
import {Input,Form} from 'antd'
import Modal,{useModal} from '../Components/Modal'
import Main from '../Components/Main'
import Stuff from './Stuff'
import {EditBar} from '../Components/'
import * as Api from '../../api/'
import {useRequest} from '../../libs/'
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



const Header:FunctionComponent<{total:number;}> = (props) => {
  return (
    <Wrapper >
      <HeadFont>部门总数 ：<BluleFont>{props.total}</BluleFont></HeadFont>
    </Wrapper>
  )
}

const Update = (props:{datasource?:{dept_name:string;dept_no:string;};visible:boolean;closeModal:()=>void}) => {
  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  React.useEffect(()=>{
    form.setFieldsValue({...props.datasource})
  },[props.datasource])
  return <Modal title={'编辑部门'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <StyleFormItem name={'dept_no'} label={'部门编号'} required initialValue = {props.datasource?.dept_no}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'dept_name'} label={'部门名称'} required initialValue = {props.datasource?.dept_name}>
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
  return <Modal title={'创建部门'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <StyleFormItem name={'dept_no'} label={'部门编号'} required>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'dept_name'} label={'部门名称'} required>
      <Input.TextArea maxLength={100} showCount/>
    </StyleFormItem>

  </StyledForm>
  </Modal>
}


const StyledTabPane = styled(Tabs)`
  margin-top:40px;
  width: 100%;
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab {
    12px 12px 0 0;
  }
  .ant-tabs-nav{
    margin-bottom:0px;
  }
  .ant-tabs-content-holder{
    background:#fff;
    border-radius:0 12px 12px 12px;
    min-height:600px;
    margin-left:1px;
    padding:37px 20px 37px 20px;
  }
`

const StyledTable = styled(Table)`
margin-top:28px;
margin-bottom:28px;
width:100%;
`
const { TabPane } = Tabs;

const Dept:FunctionComponent<{dataSource:{dept_no:string;dept_name:string;stuff_num:number}[]}> = (props) => {
  const {visible,showModal,closeModal} = useModal()
  const [currentCell,setCurrentCell] = React.useState<{dept_name:string;dept_no:string;}>()

  const columns = [
  {
    title: '部门编号',
    dataIndex: 'dept_no',
    key: 'dept_no',
  },
  {
    title: '部门名称',
    dataIndex: 'dept_name',
    key: 'dept_name',
  },
  {
    title: '部门人员数量',
    dataIndex: 'stuff_num',
    key: 'stuff_num',
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
                setCurrentCell({...item})
                showModal()
              }
          },

      }} item={record}/>
              )
  },
  ];
  return   <>
    <StyledTable dataSource={props.dataSource} columns={columns} />;
    <Update datasource = {currentCell} closeModal = {closeModal} visible = {visible}/>
    </>
}
const App:FunctionComponent = (props) => {
  const {visible,showModal,closeModal} = useModal()
const {data} = useRequest(Api.dept.get)




return(
  <Main title={<Header total = {data ?data?.length:0}/>}>
  <StyledTabPane  type="card">
      <TabPane tab="部门信息" key="1">
        <CreateButton onClick={showModal} > 创建部门</CreateButton>
        <Add closeModal = {closeModal} visible = {visible}/>
        {data && <Dept dataSource={data}/>}
      </TabPane>
      <TabPane tab="人员信息" key="2">
        <Stuff/>
      </TabPane>
  </StyledTabPane>
  </Main>
)

};
export default App
