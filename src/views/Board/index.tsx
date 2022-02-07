/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import Main from '../Components/Main'
import {Row,Col,Input,Form} from 'antd'
import {EditOutlined} from '@ant-design/icons'
import Modal,{useModal} from '../Components/Modal'
import Title from './Title'
import styled from 'styled-components';
import StepBar,{StepStatus} from '../Components/StepBar'
import Card from './Card'
import {LinkButton} from '../../libs/base/base-style'
import UUID from '../../utils/uuid'
import avatar_ico from '../../assets/common/avatar.png'
const headInfo = {
  title:'通知中心',
  author:"张三",
  createTime:"2022/01/04 11:41"
}
const steps=[{
  name:'第一阶段',
  status:StepStatus.Done
  },{
  name:'第二阶段',
  status:StepStatus.Progressing
  },
  {
  name:'第三阶段',
  status:StepStatus.Ready
  },
  {
  name:'第四阶段',
  status:StepStatus.Ready
  }]
const dataSource = [{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况已联系部长、副部长，并通知事件最近情况已联系部长、副部长，并通知事件最近情况已联系部长、副部长，并通知事件最近情况已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张大三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
},{
title:'指挥控制席',
contents:[
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  },
  {
      user:'张三',
      message:'已联系部长、副部长，并通知事件最近情况',
      creteTime:'2022-01-04 19:50:29',
      id:UUID.get()
  }
]
}]
const HeadFont = styled.p`
font-family: PingFangSC-Semibold;
font-size: 30px;
color: #393550;
letter-spacing: 0;
text-align: center;
font-weight: 600;
margin: 0;
margin-left: auto;
margin-right: auto;
`
const Name = styled.p`
font-family: PingFangSC-Semibold;
font-size: 20px;
color: #393550;
letter-spacing: 0;
font-weight: 600;
margin: 0;
margin-left: 10px;
`
const Role = styled.p`
font-family: PingFangSC-Medium;
font-size: 14px;
color: #999999;
letter-spacing: 0;
font-weight: 500;
margin-left: 10px;
`
const Wrapper = styled.div`
display:flex;
margin-top: 20px;
margin-bottom: 20px;
width: 100%;
`
const Img = styled.img`
width:49px;
height:49px;
`
const StyledRow = styled.div`
display:flex;
flex-direction:row;

`
const RowWrapper = styled(StyledRow)`
margin-bottom:1em;
width:100%;
`
const ColWrapper =  styled.div`
display:flex;
flex-direction:column;
width:100%;
`
const StyleFormItem = styled(Form.Item)`
margin-bottom:0;
`
const StyledForm = styled(Form)`
width:100%;
margin-left: 10px;
`
const App:FunctionComponent = (props) => {
  const {visible,showModal,closeModal} = useModal()
  const [form] = Form.useForm()
  const send = ()=>{
    console.log(form.getFieldsValue())
  }
  return(
    <Main title={<Title {...headInfo}/>}>
      <StepBar steps={steps}/>
      <RowWrapper>
        <HeadFont>公告栏</HeadFont>
        <LinkButton icon ={<EditOutlined /> } onClick={showModal}>发布公告</LinkButton>
        <Modal title={'发布公告'} visible= {visible} close = {closeModal} ok={send}>
        <StyledRow>
          <Img src = {avatar_ico}/>
          <ColWrapper>
            <Name>张大宝</Name>
            <Role>指挥处长|参谋部</Role>
            <StyledForm form={form}>
              <StyleFormItem name={'message'}>
                <Input.TextArea/>
              </StyleFormItem>

            </StyledForm>
          </ColWrapper>

        </StyledRow>
        </Modal>
      </RowWrapper>


       <Row style = {{width:'100%'}} gutter = {[{ xs: 8, sm: 16, md: 16, lg: 16},{ xs: 8, sm: 16, md: 16, lg: 16}]} >
      {
      dataSource.map(data => {
        return (
          <Col xs={12} sm={8} md={6} lg={6} xl={6} xxl={6}>
            <Card title= {data.title} id = {UUID.get()} contents={data.contents}/>
          </Col>
        )
      })
      }
      </Row>

    </Main>
  )

};

export default App
