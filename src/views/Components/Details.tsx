import React,{FunctionComponent} from 'react'
import { Row,Col } from 'antd';
import {PrimaryButton,SecondaryButton,StyledSpan,HDivider,Container } from '../../libs/base/base-style'


import * as Alert from "./Alert"
import styled from 'styled-components'


const StyledCol = styled(Col)`
  border-right: 1px solid ${props => props.theme.color.grey} !important;
  padding-right: ${props => props.theme.minorSpacing} !important;
`


interface DetailsProps{
  instruction:{
    title:string;
    desc:string;
  }
  type?:'single'|'double'
}

const Left:FunctionComponent<DetailsProps> = (props) => {
  return (
    <StyledCol span = {12}>
      <Alert.Instruction {...props.instruction}/>
      {props.children}
    </StyledCol>
  )
}

const FormBox:FunctionComponent<DetailsProps> = (props) => {

  return (
    <Container>
      {(props.type && props.type === 'single') ?
      <Row></Row>
      :<Container>
        <Row>
          <Left instruction = {props.instruction}/>
          <Col span = {12}>

          </Col>
        </Row>
        <HDivider/>
        <Row>
          <Col span = {12}>
            <StyledSpan>
              <PrimaryButton>确认</PrimaryButton>

            </StyledSpan>
            <SecondaryButton>取消</SecondaryButton>
          </Col>
        </Row>
      </Container>
    }


    </Container>
  )
}

export {FormBox,Left}
