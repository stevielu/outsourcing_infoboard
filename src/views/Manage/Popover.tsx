import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Popover,Checkbox,Row, Col,Input,Form} from 'antd';
import { Container,ContentFont,TitleFont,BoldFont,IconButton} from '../../libs/base/base-style'
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
const App:FunctionComponent<ProcedureProps> = (props) => {

  const [visible, setVisible] = React.useState(false);
  const handleClickChange = (val:boolean) => {
    setVisible(val);
  };





  return(
    <StyledPop
      placement="top"
      visible={visible}
      onVisibleChange = {handleClickChange}
      overlayClassName = {'styledPop'}
      overlayInnerStyle={{
        background:' #FFFFFF',
        boxShadow: '0px 0px 9px 0px rgba(167,167,167,0.5)',
        borderRadius: '6px',
      }}
      title={
        <Header>
          <WhiteFont>编辑事项</WhiteFont>

        </Header>
      }
    content={
      <Container>
        <Title>

          <WhiteFont>已编辑事项</WhiteFont>
          <Right>


          </Right>
        </Title>


      </Container>

    }
    trigger="click">
      {props.children}
    </StyledPop>
  )
}
export default App
