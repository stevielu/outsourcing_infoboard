/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React from 'react';
import { Container } from '../../libs/base/base-style'
import StepBar,{Stage} from './Components/StageBar'
import Procedures,{Status} from './Components/ProcedureBox'
import Popover from './Components/Popover'
import ProgessBar from './Components/ProgessBar'
import styled from 'styled-components'
import { map } from 'lodash';
const Main = styled(Container)`
  height:100%;
  padding:100px;

`


const Box = styled(Container)`
display:flex;
flex-direction:row;
height:200px;
justify-content:center;
`

const Item = styled(Container)`
min-width:200px;

`

const Task = styled(Container)`
display:flex;
flex-direction:row;
`
const data = [
  {
    title:'阶段一：什么就是什么',
    phase:'阶段一',
    activate:Stage.Done,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
        id:1,
      },{
        title:'有东西',
        status:Status.Done,
        id:2,
        task:[
          {
            title:'事件地点任务1事件地点任务1事件地点任务1事件地点任务1事件地点任务1事件地点任务1事件地点任务1',
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
            selected:true
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
        id:3,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
        id:4,
      }
    ]
  },{
    title:'阶段二：什么就是什么',
    phase:'阶段二',
    activate:Stage.InProgress,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Done,
        id:5,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.InProgress,
        id:6,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:7,
      },
    ]
  },{
    title:'阶段三：什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么什么就是什么',
    phase:'阶段三',
    activate:Stage.Initial,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:8,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:9,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:10,
      }
    ]
  },{
    title:'阶段四：什么就是',
    phase:'阶段四',
    activate:Stage.Initial,
    procedure:[
      {
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:11,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:12,
      },{
        title:'写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏写不下就隐藏',
        status:Status.Initial,
        id:13,
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
            <ProgessBar complete={'80%'} activated ={'10%'} unactived={"10%"}/>
            <Task>
            {map(step.procedure,item =>{
              const completeCnt = item.task ? item.task.filter(selected => selected.selected === true).length:0
              const state = completeCnt === 0?Status.Initial:completeCnt === item.task?.length ?Status.Done:Status.InProgress
              return item.task ?
              <Popover current = {{id:item.id,phase:step.phase}} data = {item.task} onChange = {(e:any)=> console.log(e)}>
                <Procedures title={item.title} status = {state} pid={item.id} tally={`${completeCnt}/${item.task.length}`}/>
              </Popover>:<Procedures {...item} pid={item.id} tally={`0/0`}/>
            })}
            </Task>
          </Item>
        })
      }
      </Box>
    </Main>
  )

};
