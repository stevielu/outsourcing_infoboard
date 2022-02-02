/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import { Table,Tag} from 'antd';
import {ActionButton} from '../../libs/base/base-style'

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
const Header:FunctionComponent<{total:number;used:number;unuse:number}> = (props) => {
  const link = useHistory()
  return (
    <Wrapper >
      <HeadFont>行动总数 ：<BluleFont>{props.total}</BluleFont></HeadFont>
      <HeadFont>已使用 ：<BluleFont>{props.used}</BluleFont></HeadFont>
      <HeadFont>未使用 ：<GreenFont>{props.unuse}</GreenFont></HeadFont>
      <CreateButton onClick={()=>link.push('/manage/template/create')}> 创建</CreateButton>
    </Wrapper>
  )
}

const status = {
  total:4,
  used:2,
  unuse:1,
}
const dataSource = [
{
  key: '1',
  planNum: 'rtewr',
  planName: '23121222ssss',
  phaseCount: 2,
  roleCount:2,
  stepsCount:2,
  author:'胡彦斌',
  createTime:'20210-12-31',
  status:true,
},
{
  key: '2',
  planNum: 'dasda',
  planName: '西湖区湖底公园1号',
  phaseCount: 32,
  roleCount:2,
  stepsCount:2,
  author:'胡彦斌',
  createTime:'20210-12-31',
  status:true,
},
{
  key: '3',
  planNum: 'rtewr',
  planName: '西湖区湖底公园1号',
  phaseCount: 22,
  roleCount:2,
  stepsCount:2,
  author:'胡彦斌',
  createTime:'20210-12-31',
  status:false,
},
];

const columns = [
{
  title: '预案编码',
  dataIndex: 'planNum',
  key: 'playNum',
},
{
  title: '预案名称',
  dataIndex: 'planName',
  key: 'planName',
},
{
  title: '阶段数',
  dataIndex: 'phaseCount',
  key: 'phaseCount',
},
{
  title: '角色数',
  dataIndex: 'roleCount',
  key: 'roleCount',
},
{
  title: '步骤数',
  dataIndex: 'stepsCount',
  key: 'stepsCount',
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
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render:tags => (
    <Tag color={tags===true?'#1845FF':'#00CF1C'} key={UUID.get()}>
      {tags===true?'已使用':"未使用"}
    </Tag>
    ),
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
        view:{
            handle:()=>{}
        },
        edit:{
            handle:()=>{}
        },

    }} item={record} disabled = {
      record.status === true?{view:false,delete:true,edit:true}:{view:false,delete:false,edit:false}
    }/>
            )
},
];


const StyledTable = styled(Table)`
margin-top:28px;
margin-bottom:28px;
width:100%;
`
const App:FunctionComponent = (props) => {

return(
  <Main title={<Header {...status}/>}>
  <StyledTable dataSource={dataSource} columns={columns} />;
  </Main>
)

};
export default App
