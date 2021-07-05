/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{useState} from 'react'
import {Steps,Row,Col,Divider} from 'antd'
import styled from 'styled-components';

import { StepBackwardOutlined,StepForwardOutlined} from '@ant-design/icons';

import { Container,IconButton } from '../../libs/base/base-style'

const { Step } = Steps;
type StepsValue = {
  title:string;
  content:JSX.Element|string;
}[]

const StyledCol = styled(Col)`
  margin:8px 0 8px 0 !important;
  width:100%;
`
type nextCallback = (e:any) => Promise<any>

export default ({steps,onNext}:{steps:StepsValue;onNext?:nextCallback}) => {
  const [current,setCurrent] = useState(0)

  const next = (e:any) => {
    if(onNext ){
      const handle = onNext(current)
      if(handle){
        handle.then( res => {
            setCurrent(current + 1)
          }
        ).catch( err => {
            console.log('next error',err)
        })
      }
    }
  }

  const prev = () => setCurrent(current - 1)

  return (
    <Container>
    <Row>
      <Col span={2} >
      {current > 0 && (
          <Container>
            <IconButton icon={<StepBackwardOutlined/>} onClick={prev} />
            <Divider type="vertical" />
          </Container>
      )}
      </Col>

      <Col span={20}>
        <Steps progressDot current={current} size='small' >
          {
            steps.map(item => (
              <Step title = {item.title} key={item.title}/>
            ))
          }
        </Steps>
      </Col>

      <Col span={2} >
      {current < steps.length - 1 && (
          <Container>
            <Divider type="vertical" />
            <IconButton icon={<StepForwardOutlined/>} onClick={next}/>
          </Container>

      )}
      </Col>


    </Row>
    <Row>
      {
        steps.map((item,index) => {
          return (
          <Col key={index} span={24} style = {{display:(current == index) ? 'initial':'none'}}>
            {
              item.content
            }
          </Col>
        )})
      }
    </Row>
    </Container>
  )

}
