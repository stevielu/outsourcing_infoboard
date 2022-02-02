/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,memo} from 'react';
import { Select,Button,Input,Form} from 'antd';
import {CaretDownOutlined,CloseCircleFilled,ContainerFilled} from '@ant-design/icons'
import {Share} from './Template'
import Popover from './Popover'
import styled from 'styled-components';


const { Option } = Select;






const ProcedureWrapper = styled.div`
height: 32px;
background: #fff;
display: flex;
flex-direction: row;
align-items: center;
border-radius: 3px;
margin: 8px;
outline: 1px solid #CBCBCB;
position:relative;
`

const StyledSelect = styled(Select)`
  min-width:55px;
  height:32px;
 .ant-select-selector{
    color: #fff;
    outline: 1px solid #6871FC !important;
    border:0px !important;
     font-size: 12px;
     background: #6871FC !important;
     border-radius: 3px 0px 0px 3px !important;
}
`
const StyledSelect2 = styled(Select)`
  width:73px;
  height:32px;
 .ant-select-selector{
    outline: 1px solid #CBCBCB !important;
    border:0px !important;
     font-size: 12px;
     background: #F9F3F3 !important;
     border-radius: 0px 3px 3px 0px !important;
}`
const StyledSelect3 = styled(Select)`
  width:64px;
  height:32px;
 .ant-select-selector{
    outline: 1px solid #CBCBCB !important;
    border:0px !important;
     font-size: 12px;
     background: #F9F3F3 !important;
     border-radius: 0px 3px 3px 0px !important;
}
`

const StyledInput = styled(Input)`
  width:155px;
  height:32px;
`
const Count = styled.p`
width: 18px;
margin:0;
font-family: PingFangSC-Semibold;
font-size: 12px;
color: #FFFFFF;
letter-spacing: 0;
font-weight: 600;
background:#6871FC;
`

const StyleFormItem = styled(Form.Item)`
margin-bottom:0;
`

const DeleteBtn = styled(Button)`
position:absolute;
top: -15px;
right: -15px;
`
const Procedure:FunctionComponent<{role:string,index:number,id?:number|string,form:ReturnType<typeof Form.useForm>}> = (props) => {
  const [taskCnt,setTaskCnt] = React.useState(0)
  const [visible,setVisible] = React.useState(true)
  const [f] = props.form

  const gen = ()=>{
    let arrs:Array<JSX.Element> = []
    for(let i =0;i<=99;i++){
      arrs.push( <Option value={i}>{i}</Option>)
    }
    return arrs
  }
  const {steps,showDelete} = React.useContext(Share)
  const id = props.id?props.id:props.index

  return(
    <div>
    {visible === true &&
    <ProcedureWrapper>
      {showDelete[props.role] === true && <DeleteBtn type='link' icon={<CloseCircleFilled style={{color:'red'}}/>} onClick={() => setVisible(false)}/>}
      <StyleFormItem name={[props.role,id,'index']} initialValue = {props.index}>
        <StyledSelect  suffixIcon={<CaretDownOutlined style={{color:'#fff'}}/>}>
          {gen().map(item => item)}
        </StyledSelect>
      </StyleFormItem>
      <StyleFormItem name={[props.role,id,'phase']} initialValue = {steps[0].name}>
        <StyledSelect2  suffixIcon={<CaretDownOutlined/>} defaultValue ={steps[0].name}>
          {steps.map((item,index) => {
            return(<Option value={item.name}>{`阶段${index+1}`}</Option>)
          })}
        </StyledSelect2>
      </StyleFormItem>
      <StyleFormItem name={[props.role,id,'isCritical']} initialValue = {false}>
        <StyledSelect3  suffixIcon={<CaretDownOutlined/>} defaultValue ={false}>
          <Option value={false}>普通</Option>
          <Option value={true}>关键</Option>
        </StyledSelect3>
      </StyleFormItem>
      <StyleFormItem name={[props.role,id,'contents']}>
        <StyledInput bordered={false} placeholder={'请输入步骤内容'} suffix={<Button type={'link'} icon={
            <StyleFormItem name={[props.role,id,'tasks']}>
          <Popover  onChange = {(e:any)=> {
            setTaskCnt(Object.values(e).length)
            f.setFieldsValue({
              tasks:e
            })
          }}>
            {taskCnt === 0?<ContainerFilled  style={{color:'#6871FC'}}/>:<Count>{taskCnt}</Count>}
          </Popover>
          </StyleFormItem>
        }/>}/>
      </StyleFormItem>
      </ProcedureWrapper>}
      </div>
  )
}


export default memo(Procedure)
