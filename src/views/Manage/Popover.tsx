import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Popover,Select,Button, Col,Input,Form} from 'antd';
import { Container,ContentFont,TitleFont,LinkButton,IconButton} from '../../libs/base/base-style'
import {genOptions} from './utils'
import { CheckOutlined ,CloseOutlined} from '@ant-design/icons';
import './index.css'


const Header = styled(Container)`
display: flex;
color: #fff;
justify-content: flex-start;
height: 100%;
align-items: center;
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
const Share = React.createContext<any>(null);

const SelectBefore:FunctionComponent<{id:number|string;}> = (props) =>{
  return(<Form.Item style={{marginBottom:0}}name={[props.id,'index']}>
    <Select placeholder={'序号'}>
        {genOptions().map(item => item)}
    </Select>
  </Form.Item>)
}

const Clear:FunctionComponent<{onClick:()=>void}> = (props) =>{
  const {setCount} = React.useContext(Share)
  return (<IconButton icon={<CloseOutlined />} onClick={()=>{
    props.onClick()
    setCount(cnt => cnt -1)
  }}/>)
}
const StyledInput = styled(Input)`
  margin-top:10px;
`
const NewInput:FunctionComponent<{index:number|string}> = (props) => {
  const [visible,setVisible] = React.useState(true)
  // let selected = ''
  // const index = React.useMemo(()=>{
  //
  //   return selected
  // },[selected])
  // React.useEffect(()=>{
  //   form.setFieldsValue({[props.index]:{[index]:form.getFieldValue(props.index)}})
  // },[index])
  return (
    <div>{visible === true &&<Form.Item style={{marginBottom:0}}name={[props.index,'content']}>
      <StyledInput placeholder="请填写备注，可以为空" size="small" addonBefore={<SelectBefore id={props.index}/>} suffix={<Clear onClick={()=>{setVisible(false)}}/>}/>
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

export type ProcedureProps = {
  onChange?:(e:any)=>void;
}
const App:FunctionComponent<ProcedureProps> = (props) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = React.useState(false);
  const [count,setCount] = React.useState(1)
  const handleClickChange = (val:boolean) => {
    setVisible(val);
  };
  const [elements,setElements] = React.useState([<NewInput index={0}/>]);

  const add = () =>{
    setElements(items => {
      return [...items,<NewInput index = {items.length}/>]
    })
    setCount(cnt => cnt + 1)
  }

  const save = () => {
    props.onChange && props.onChange(form.getFieldsValue())
    setVisible(false)
  }

  return(
    <Share.Provider value={{count,setCount}}>
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
        <StatusFont style={{marginRight:'auto'}}>已添加<BlueFont>{count}</BlueFont>事项</StatusFont>
        <LinkButton style={{marginLeft:'auto'}} onClick={add}>+ 添加事项</LinkButton>
        </StyledStatus>
        <Form form={form}>
          {elements}
        </Form>
        <Footer>
          <Button type="text" onClick={() => setVisible(false)}>取消</Button>
          <StyledButton type='primary' onClick={save}>保存</StyledButton>
        </Footer>
      </Container>

    }
    trigger="click">
      {props.children}
    </StyledPop>
    </Share.Provider>
  )
}
export default App
