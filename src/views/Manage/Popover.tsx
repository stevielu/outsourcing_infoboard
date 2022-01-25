import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Popover,Select,Button, Col,Input,Form} from 'antd';
import { Container,ContentFont,TitleFont,LinkButton,IconButton} from '../../libs/base/base-style'
import {genOptions} from './utils'
import { CheckOutlined ,CloseOutlined} from '@ant-design/icons';
import './index.css'
export type ProcedureProps = {
  onChange?:(e:any)=>void;
}

const Tally = styled(ContentFont)`
  margin-left:auto;
  color:white;
`
const Header = styled(Container)`
display: flex;
color: #fff;
justify-content: flex-start;
height: 100%;
align-items: center;
`
const Right = styled(Container)`
  margin-left:auto;

`
const StyledCheckBox = styled(Col)`
padding-left: 4px;
  .ant-checkbox-checked .ant-checkbox-inner {
  background-color: #6231d3;
  border-color: #6231d3;
}
`

const StyledNotes = styled(Col)`
  margin-top: 10px;
  margin-bottom: 10px;
  .ant-input{
    border-radius:5px;
    background:#fff5e7;
  }
`

const LeftBorder = styled(Container)`
  background: #393550;
  height: 20px;
  width: 5px;
  margin-right: 5px;
`
const Title = styled(Container)`
  display:flex;
  align-items: center;
  background:black;
  background: #393550;
  border-radius: 3px;
  height: 40px;
  padding: 5px;
  .ant-checkbox-checked .ant-checkbox-inner {
  background-color: #6231d3;
  border-color: #6231d3;
}
`
const WhiteFont = styled(ContentFont)`
  color:white;
  font-size:14px;
`

const StyledPop = styled(Popover)`

`

const StyledStatus = styled.div`
display:flex;
height:50px;
border-bottom:1px solid #D0D0D0;
width:100%;
align-items:center;
`

const StatusFont = styled.p`
font-size: 12px;
color: #393550;
font-weight: 500;
margin: 0;
display: flex;
`
const BlueFont = styled.p`
font-size: 12px;
color: #686CFF;
font-weight: 500;
margin: 0;
width: 8px;
`

const SelectBefore:FunctionComponent<{onChange:(val)=>void}> = (props) =>{
  return<Select placeholder={'序号'} onChange={props.onChange}>
      {genOptions().map(item => item)}
    </Select>
}

const Clear:FunctionComponent<{onClick:()=>void}> = (props) =>{
  return (<IconButton icon={<CloseOutlined />} onClick={()=>{
    props.onClick()
  }}/>)
}
const StyledInput = styled(Input)`
  margin-top:10px;
`
const NewInput:FunctionComponent<{index:number|string}> = (props) => {
  const [visible,setVisible] = React.useState(true)

  return (
    <div>{visible === true &&<Form.Item style={{marginBottom:0}}name={props.index}>
      <StyledInput placeholder="请填写备注，可以为空" size="small" addonBefore={<SelectBefore onChange={(val) =>{}}/>} suffix={<Clear onClick={()=>{setVisible(false)}}/>}/>
      </Form.Item>
    }</div>

  )


}

const Footer = styled.div`
display:flex;
align-items:flex-end;
height: 50px;
justify-content: end;
`
const StyledButton = styled(Button)`
background:#393550;
border-color:#393550;
&:hover {
    background:#393550 !important;
    border-color:#393550 !important;
}
&:focus{
  background: #393550 !important;
  border-color:#393550 !important;
}
`
const App:FunctionComponent<ProcedureProps> = (props) => {

  const [visible, setVisible] = React.useState(false);
  const handleClickChange = (val:boolean) => {
    setVisible(val);
  };
  const [elements,setElements] = React.useState([<NewInput index={0}/>]);

  const add = () =>{
    setElements(items => {
      return [...items,<NewInput index = {items.length}/>]
    })
  }
  const [form] = Form.useForm()
  const save = () => {
    console.log(form.getFieldsValue())
  }
  return(
    <StyledPop
      placement="bottom"
      visible={visible}
      onVisibleChange = {handleClickChange}
      overlayClassName = {'styledPop'}
      overlayInnerStyle={{
        background:' #FFFFFF',
        boxShadow: '0px 0px 9px 0px rgba(167,167,167,0.5)',
        borderRadius: '6px',
        minWidth:'360px',
      }}
      title={
        <Header>
          <WhiteFont>编辑事项</WhiteFont>

        </Header>
      }
    content={
      <Container style={{display:'flex',flexDirection:'column'}}>
        <StyledStatus>
        <StatusFont style={{marginRight:'auto'}}>已添加<BlueFont>0</BlueFont>事项</StatusFont>
        <LinkButton style={{marginLeft:'auto'}} onClick={add}>+ 添加事项</LinkButton>
        </StyledStatus>
        <Form form={form}>
          {elements}
        </Form>
        <Footer>
          <Button type="text">取消</Button>
          <StyledButton type='primary' onClick={save}>保存</StyledButton>
        </Footer>
      </Container>

    }
    trigger="click">
      {props.children}
    </StyledPop>
  )
}
export default App
