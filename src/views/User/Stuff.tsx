/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import { Table,Tabs,Select} from 'antd';
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
flex: 1 1 auto;
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

const Update = (props:{datasource?:{password:string;username:string;role:string;name:string;no:string;dept:{name:string;id:string}[]};visible:boolean;closeModal:()=>void}) => {
  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  React.useEffect(()=>{
    form.setFieldsValue({...props.datasource})
  },[props.datasource])
  return <Modal title={'编辑部门'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <StyleFormItem name={'no'} label={'员工编号'} required initialValue = {props.datasource?.no}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'name'} label={'员工姓名'} required initialValue = {props.datasource?.no}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'dept'} label={'所属部门'} required initialValue = {props.datasource?.name}>
      <Select>
      </Select>
    </StyleFormItem>
    <StyleFormItem name={'role'} label={'角色'} required initialValue = {props.datasource?.role}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'username'} label={'用户名'} required initialValue = {props.datasource?.username}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'password'} label={'密码'} required initialValue = {props.datasource?.password}>
      <Input/>
    </StyleFormItem>
  </StyledForm>
  </Modal>
}

const InlineWrapper = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
grid-gap: 20px;
`
const Add = (props:{visible:boolean;closeModal:()=>void;dept:{name:string;id:string}[]}) => {

  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  return <Modal title={'创建部门'} visible= {props.visible} close = {props.closeModal} ok={send}>
  <StyledForm form={form} layout={'vertical'}>
    <InlineWrapper>
      <StyleFormItem name={'no'} label={'员工编号'} required >
        <Input/>
      </StyleFormItem>
      <StyleFormItem name={'name'} label={'员工姓名'} required>
        <Input/>
      </StyleFormItem>
    </InlineWrapper>
    <InlineWrapper>
      <StyleFormItem name={'dept'} label={'所属部门'} required >
        <Select>
         {
           props.dept.map(item => {
             return <Select.Option value={item.id}>{item.name}</Select.Option>
           })
         }
        </Select>
      </StyleFormItem>
      <StyleFormItem name={'role'} label={'角色'} required>
        <Input/>
      </StyleFormItem>
    </InlineWrapper>
    <StyleFormItem name={'username'} label={'用户名'}>
      <Input/>
    </StyleFormItem>
    <StyleFormItem name={'password'} label={'密码'}>
      <Input/>
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

const Dept:FunctionComponent = () => {
  const {visible,showModal,closeModal} = useModal()
  const [currentCell,setCurrentCell] = React.useState<{name:string;no:string;}>()
  const dataSource = [
  {
    key: '1',
    name: 'rtewr',
    no: '23121222ssss',
    count:'3',
  },
  {
    key: '2',
    name: 'rtewr',
    no: '23121222ssss',
    count:'3',
  },
  {
    key: '3',
    name: 'rtewr',
    no: '下',
    count:'3',
  },
  ];
  const columns = [
  {
    title: '部门编号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门人员数量',
    dataIndex: 'count',
    key: 'count',
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
    <StyledTable dataSource={dataSource} columns={columns} />;
    <Update closeModal = {closeModal} visible = {visible}/>
    </>
}
const App:FunctionComponent = (props) => {
  const {visible,showModal,closeModal} = useModal()
  const [form] = Form.useForm()


const dept = [
  {
    name:'test',
    id:'123'
  }
]



return(
  <>
    <CreateButton onClick={showModal} > 创建人员</CreateButton>
    <Add closeModal = {closeModal} visible = {visible} dept= {dept}/>
    <Dept/>
  </>
)

};
export default App
