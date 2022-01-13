import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Popover,Checkbox,Row, Col,Input,Form} from 'antd';
import { Container,ContentFont,TitleFont,BoldFont,IconButton} from '../../../libs/base/base-style'
import { CheckOutlined ,CloseOutlined} from '@ant-design/icons';

export type ProcedureProps = {
  current:{
    phase:string;
    id:string|number;
  },
  data:{
    title:string;
    id:number;
    selected:boolean;
  }[],
  onChange:(e:any)=>void;
}

const Tally = styled(ContentFont)`
  margin-left:auto;
  color:white;
`
const Header = styled(Container)`
  display:flex;
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
const App:FunctionComponent<ProcedureProps> = (props) => {
  const [checkedList, setCheckedList] = React.useState(props.data.filter(item => item.selected === true).map(item => item.id));
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const handleClickChange = (val:boolean) => {
    setVisible(val);
  };

  const onClick = React.useCallback((e:any)=>{
    setCheckedList(e.target.checked ? props.data.map(item => item.id) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

  },[])
  const onChange = (list:any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < props.data.length);
    setCheckAll(list.length === props.data.length);


  };

  const update = ()=>{
    const value = form.getFieldsValue()
    const res = Object.keys(value).map(key => {
      return{
        checked:checkedList.find(member => String(member) === key) != undefined,
        notes:value[key].notes === undefined ?'':value[key].notes
      }
    })
    return res
  }
  const [form] = Form.useForm()
  return(
    <Popover
      placement="rightTop"
      visible={visible}
      onVisibleChange = {handleClickChange}
      title={
        <Header>
          <LeftBorder/>
          <TitleFont style = {{fontWeight:550}}>事项处理</TitleFont>
          <Right>
            <IconButton icon={<CloseOutlined />} color={'grey'} onClick = {()=>setVisible(false)}/>
            <IconButton icon={<CheckOutlined />}
            onClick = {()=>{
              props.onChange(update())
              setVisible(false)
            }} />
          </Right>
        </Header>
      }
    content={
      <Container>
        <Title>
          <Checkbox indeterminate={indeterminate} onChange={onClick} checked={checkAll} style={{ marginRight: '5px' }}/>
          <WhiteFont>{props.current.phase}/{props.current.id}</WhiteFont>
          <Right>

            <Tally>完成情况(<ContentFont color={'#9281b9'}>{checkedList.length}</ContentFont>/<ContentFont color={'white'}>{props.data.length}</ContentFont>)</Tally>
          </Right>
        </Title>
        <Checkbox.Group style={{ width: '250px',paddingTop:'10px',flexDirection:'row-reverse'}} onChange={onChange} value = {checkedList}>
          <Row>
          <Form form={form}>
            {props.data.map(item=>{
              return (
                <Container >
                  <Form.Item
                    name={[item.id, 'checked']}
                    style={{ margin:0}}
                  >
                    <StyledCheckBox span={24}>
                      <Checkbox onChange={onChange} value={item.id}><BoldFont style={{fontSize:'11px'}}>{item.title}</BoldFont></Checkbox>
                    </StyledCheckBox>
                  </Form.Item>
                  <Form.Item
                    name={[item.id, 'notes']}
                    style={{ margin:0}}
                  >
                    <StyledNotes span={24}>
                      <Input placeholder={"请填写备注，可以为空"} onChange={(value)=>{
                        console.log(value)
                      }}></Input>
                    </StyledNotes>
                  </Form.Item>

                </Container>

              )
            })}
            </Form>
          </Row>
        </Checkbox.Group>
      </Container>

    }
    trigger="click">
      {props.children}
    </Popover>
  )
}
export default App
