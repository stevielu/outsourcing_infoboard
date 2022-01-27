/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,memo} from 'react';
import { Tabs,Select,Button,Input,Form} from 'antd';
import {CaretDownOutlined,ContainerFilled} from '@ant-design/icons'
import Main from '../Components/Main'
import StepBar,{StepStatus} from '../Components/StepBar'
import Procedure from './Procedure'
import Popover from './Popover'
import styled from 'styled-components';

const { TabPane } = Tabs;
const { Option } = Select;

export const Share = React.createContext<any>(null);
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
const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  border-left:3px solid #1845FF;
  align-items:center;
  padding-left:3px;
  height:15px;
  margin-bottom:10px;
`

const Title = styled.p`
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
  font-weight: 600;
  margin:0;
`

const SubTitle = styled.p`
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
  font-weight: 600;
  padding-left:45px;
  margin:0;
`
const Tag:FunctionComponent<{name:string,subTitle?:string}> = (props) => {
  return(
    <Wrapper>
      <Title>{props.name}</Title>
      {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
    </Wrapper>
  )
}

const CNNumChar =  ["一","二","三","四","五","六","七","八","九"]


// const ProcedureWrapper = styled.div`
// height: 32px;
// background: #fff;
// display: flex;
// flex-direction: row;
// align-items: center;
// border-radius: 3px;
// margin: 8px;
// outline: 1px solid #CBCBCB;
// `
//
// const StyledSelect = styled(Select)`
//   width:55px;
//   height:32px;
//  .ant-select-selector{
//     color: #fff;
//     outline: 1px solid #6871FC !important;
//     border:0px !important;
//      font-size: 12px;
//      background: #6871FC !important;
//      border-radius: 3px 0px 0px 3px !important;
// }
// `
// const StyledSelect2 = styled(Select)`
//   width:73px;
//   height:32px;
//  .ant-select-selector{
//     outline: 1px solid #CBCBCB !important;
//     border:0px !important;
//      font-size: 12px;
//      background: #F9F3F3 !important;
//      border-radius: 0px 3px 3px 0px !important;
// }`
// const StyledSelect3 = styled(Select)`
//   width:64px;
//   height:32px;
//  .ant-select-selector{
//     outline: 1px solid #CBCBCB !important;
//     border:0px !important;
//      font-size: 12px;
//      background: #F9F3F3 !important;
//      border-radius: 0px 3px 3px 0px !important;
// }
// `
//
// const StyledInput = styled(Input)`
//   width:155px;
//   height:32px;
// `
// const Count = styled.p`
// width: 18px;
// margin:0;
// font-family: PingFangSC-Semibold;
// font-size: 12px;
// color: #FFFFFF;
// letter-spacing: 0;
// font-weight: 600;
// background:#6871FC;
// `

const StyleFormItem = styled(Form.Item)`
margin-bottom:0;
`
// const Procedure:FunctionComponent<{role:string,id:number|string,form:ReturnType<typeof Form.useForm>}> = (props) => {
//   const [taskCnt,setTaskCnt] = React.useState(0)
//   const [f] = props.form
//
//   const gen = ()=>{
//     let arrs:Array<JSX.Element> = []
//     for(let i =1;i<=99;i++){
//       arrs.push( <Option value={i}>{i}</Option>)
//     }
//     return arrs
//   }
//   const {steps} = React.useContext(Share)
//   return(
//     <ProcedureWrapper>
//     <StyleFormItem name={[props.role,props.id,'index']}>
//       <StyledSelect  suffixIcon={<CaretDownOutlined style={{color:'#fff'}}/>} defaultValue ={1}>
//         {gen().map(item => item)}
//       </StyledSelect>
//     </StyleFormItem>
//     <StyleFormItem name={[props.role,props.id,'phase']}>
//       <StyledSelect2  suffixIcon={<CaretDownOutlined/>} defaultValue ={steps[0].name}>
//         {steps.map((item,index) => {
//           return(<Option value={item.name}>{`阶段${index+1}`}</Option>)
//         })}
//       </StyledSelect2>
//     </StyleFormItem>
//     <StyleFormItem name={[props.role,props.id,'isCritical']}>
//       <StyledSelect3  suffixIcon={<CaretDownOutlined/>} defaultValue ={false}>
//         <Option value={false}>普通</Option>
//         <Option value={true}>关键</Option>
//       </StyledSelect3>
//     </StyleFormItem>
//     <StyleFormItem name={[props.role,props.id,'contents']}>
//       <StyledInput bordered={false} placeholder={'请输入步骤内容'} suffix={<Button type={'link'} icon={
//         <Popover  onChange = {(e:any)=> {
//           setTaskCnt(Object.values(e).length)
//           f[0].setFieldsValue({
//             [props.id]:e
//           })
//         }}>
//           {taskCnt === 0?<ContainerFilled  style={{color:'#6871FC'}}/>:<Count>{taskCnt}</Count>}
//         </Popover>
//       }/>}/>
//     </StyleFormItem>
//     </ProcedureWrapper>
//   )
// }
const CreateWrapper = styled.div`
flex-direction:row;
display: flex;
align-items: self-start;
border: 1px solid #F3F3F3;
border-left:4px solid #8771FF;
min-height:100px;
width:100%;
margin-bottom:25px;
margin-top:17px;
height:130px;
`

const RoleWrapper = styled.div`
max-width:209px;
min-width:209px;
background: #F3F3F3;
height:100%;
display:flex;
flex-direction: column;
padding:12px 20px 12px 20px;
flex: 1 0 auto;
`
const RoleHeader = styled.div`
flex-direction:row;
display: flex;
align-items: center;
margin-bottom: 15px;
`
const RoleLabel = styled.p`
font-size: 14px;
color: #333333;
text-align: center;
font-weight: 600;
margin:0;
`
const DetailsWrapper = styled.div`
display:flex;
padding:16px 16px 16px 0;
flex-direction: row;
justify-content: flex-start;
height: 100%;
overflow: auto;
flex-wrap: wrap;
`
const Create:FunctionComponent<{form:ReturnType<typeof Form.useForm>;label:string;phase:Array<{name:string,status:StepStatus,id?:string}>;roles:Array<{name:string,id:string}>}> = (props) => {
  const [prc,setPrc] = React.useState<any>()
  return (<CreateWrapper>
      <RoleWrapper>
        <RoleHeader>
          <RoleLabel>{props.label}</RoleLabel>
          <Button style={{marginLeft:'auto'}} type="link" onClick={React.useCallback(()=>{
            setPrc(content => {
              if(!content){
                return [<Procedure form={props.form} role = {props.label} id= {0}/>]
              }else{
                return [...content,<Procedure form= {props.form} role = {props.label} id= {content.length}/>]
              }

            })
          },[])}>+步骤</Button>
        </RoleHeader>
        <StyleFormItem name={[props.label,'roleId']}>
        <Select   suffixIcon={<CaretDownOutlined />}>
          {props.roles.map(role =>{
            return <Option value={role.id}>{role.name}</Option>
          })}
        </Select>
        </StyleFormItem>

      </RoleWrapper>
      <DetailsWrapper>
        {prc && prc.map(item => {
          return item
        })}
      </DetailsWrapper>
    </CreateWrapper>)
}


const Footer = styled.div`
border-top: 1px solid #979797;
width:100%;
height:60px;
`

const App:FunctionComponent = (props) => {
  const [steps,setSteps] = React.useState([{
      name:'第一阶段',
      status:StepStatus.Ready
    }])

  const  callback = (key)=>{
    console.log(key);
  }
  const selectChange = (value)=>{
    const cnt:number = Number(value)
    let arr:typeof steps = []
    for(let i = 0;i < cnt;i++){
      arr.push({
          name:`第${CNNumChar[i]}阶段`,
          status:StepStatus.Ready
        })
    }
    setSteps(arr)
  }

  const [form] = Form.useForm()
  return(
    <Main title={'编辑预案模版'}>
    <Form form={form} style={{display:'contents'}}>
    <Share.Provider value={{steps}}>

    <StyledTabPane onChange={callback} type="card">
        <TabPane tab="基础信息" key="1">

        </TabPane>
        <TabPane tab="业务信息" key="2">
          <Tag name={'阶段数量'}/>
          <StyleFormItem name={'phaseNum'}>
          <Select style={{ width: 260,marginBottom:'25px'}} onChange={selectChange} placeholder={'请选择数量'} suffixIcon={<CaretDownOutlined />}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
          </Select>
          </StyleFormItem>
          <Tag name={'阶段名称'} subTitle = {' 支持中英文、数字、和特殊字符 - _() ，长度4~20，中文算两个字符 必须以中文、英文或数字开头'}/>
          <StyleFormItem name={'stages'}>
          <StepBar steps = {steps} onChange = {(val)=>{
              form.setFieldsValue({stages:val})
            }}/>
          </StyleFormItem>
          <Tag name={'预案角色'}/>
          <Create form={[form]} phase = {steps} label={'第一角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第二角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第三角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第四角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第五角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第六角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Create form={[form]} phase = {steps} label={'第七角色'} roles = {[{name:'王二麻子',id:'1'},{name:'王大麻',id:'2'},{name:'王小麻',id:'3'}]}/>
          <Footer>
            <Button onClick={()=>{
              console.log(form.getFieldsValue())
            }}>保存</Button>
          </Footer>
        </TabPane>
      </StyledTabPane>
      </Share.Provider>
      </Form>

    </Main>
  )

};

export default App
