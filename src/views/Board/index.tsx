/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent} from 'react';
import Main from '../Components/Main'
import {Row,Col} from 'antd'
import Title from './Title'
import styled from 'styled-components';
import StepBar,{StepStatus} from '../Components/StepBar'
import Card from './Card'
import UUID from '../../utils/uuid'
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
margin-left: auto;
margin-right: auto;
`
const Wrapper = styled.div`
display:flex;
margin-top: 20px;
margin-bottom: 20px;
width: 100%;
`
const Item = styled.div`
background: #FFFFFF;
border-radius: 10px;
`
const App:FunctionComponent = (props) => {
  return(
    <Main title={<Title {...headInfo}/>}>
      <StepBar steps={steps}/>
      <HeadFont>公告栏</HeadFont>

       <Row style = {{width:'100%'}} gutter = {[{ xs: 8, sm: 16, md: 16, lg: 16},{ xs: 8, sm: 16, md: 16, lg: 16}]} >
      {
      dataSource.map(data => {
        return (
          <Col xs={12} sm={8} md={6} lg={6} xl={6} xxl={6}>
            <Card title= {data.title} id = {UUID.get()}/>
          </Col>
        )
      })
      }
      </Row>

    </Main>
  )

};

export default App
