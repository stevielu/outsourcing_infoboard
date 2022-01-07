/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React from 'react';
import { Container } from '../../libs/base/base-style'
import StepBar,{Stage} from './Components/StageBar'
import Procedures,{Status} from './Components/ProcedureBox'
import Popover from './Components/Popover'
import styled from 'styled-components'
import { map } from 'lodash';
const Main = styled(Container)`
  height:100vh;
  padding:100px;
  background:#ffffff;
`


const Box = styled(Container)`
display:flex;
flex-direction:row;
height:200px;
justify-content:center;
`

const Item = styled(Container)`
min-width:200px;
flex:1;
`

const Task = styled(Container)`
display:flex;
flex-direction:row;
`
const data = [
  {
    title:'阶段一：什么就是什么',
    activate:Stage.Done,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
      },{
        title:'有东西',
        status:Status.Done,
        task:[
          {
            title:'事件地点任务1',
            id:0,
            selected:false
          },
          {
            title:'事件地点任务2',
            id:1,
            selected:false
          },
          {
            title:'事件地点任务',
            id:2,
            selected:false
          },
          {
            title:'事件地点任务',
            id:3,
            selected:true
          },
          {
            title:'事件地点任务',
            id:4,
            selected:false
          }
        ]
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
      }
    ]
  },{
    title:'阶段二：什么就是什么',
    activate:Stage.InProgress,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.InProgress,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
      },
    ]
  },{
    title:'阶段三：什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么',
    activate:Stage.Initial,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
      }
    ]
  },{
    title:'阶段四：什么就是',
    activate:Stage.Initial,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Limited,
        task:[
          {
            title:'事件地点任务',
            id:5,
            selected:false
          },
          {
            title:'事件地点任务',
            id:6,
            selected:false
          },

        ]
      }
    ]
  }
]

export default () => {
  return (
    <Main>
      <Box>
      {
        data.map(step => {
          return <Item>
            <StepBar {...step}/>
            <Task>
            {map(step.procedure,item =>{
              return item.task ?
              <Popover data = {item.task} onChange = {(e:any)=> console.log(e)}>
                <Procedures {...item}/>
              </Popover>:<Procedures {...item}/>
            })}
            </Task>
          </Item>
        })
      }
      </Box>
    </Main>
  )

};
