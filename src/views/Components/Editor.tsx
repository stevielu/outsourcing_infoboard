/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{FunctionComponent} from 'react'
import { message,Button,Divider,Tag,Switch,Popconfirm,Input} from 'antd'
import styled from 'styled-components';

import {LinkButton,Container} from '../../libs/base/base-style'

const ButtonGroup = Button.Group


/********************Layout Style*********************/
const StyleDiver = styled(Divider)`
  margin:0 2px !important;
`
const StyleTag = styled(Tag)`
  min-width: 25%;
  text-align: center;
`
/********************Interface *********************/
export type CellAction = {
  [name:string]:{
    handle:(item:any,inputValue?:any,e?:Event) => void;
    title?:string;
  }
}

export type SwitcherTag = {
  name:string;
  color:string;
}


/********************Elements *********************/
/*
编辑 解锁输入框
Parameter @action 编辑栏配置，事件handle和自定义编辑名；@item 绑定操作对象
Return
*/
type EditBarProps = {
  action?:CellAction;
  item:any;
  event?:Event;
  value?:any;
  disabled?:{[name:string]:boolean};
}
export const EditBar:FunctionComponent<EditBarProps> = (props) => {
  const action = props.action
  const item = props.item
  const event = props.event
  const val = props.value
  return (

    <ButtonGroup>
      {action && action.download !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{action.download.handle(item)}} disabled = {props.disabled && props.disabled['download']}>
          {action.download.title?action.download.title:'下载'}
          </LinkButton>
        </Container>
      }
      {action && action.create !== undefined &&
        <Container>
          <StyleDiver type="vertical" />

            <LinkButton onClick = {()=>{action.create.handle(item)}} disabled = {props.disabled && props.disabled['create']}>
            {action.create.title?action.create.title:'创建'}
            </LinkButton>

        </Container>
      }

      {action && action.subscribe !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{action.subscribe.handle(item)}} disabled = {props.disabled && props.disabled['subscribe']}>订阅</LinkButton>
        </Container>
      }
      {action && action.view !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{action.view.handle(item)}} disabled = {props.disabled && props.disabled['view']}>查看</LinkButton>
        </Container>
      }
      {action && action.edit !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{action.edit.handle(item)}} disabled = {props.disabled && props.disabled['edit']}>编辑</LinkButton>
        </Container>
      }
      {action && action.copy !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{
            var value = item
            if(typeof item === typeof {current:Input}){
              value = item.current.state.value
            }
            action.copy.handle(value)

            message.success('复制成功');
          }} disabled = {props.disabled && props.disabled['copy']}>复制</LinkButton>
        </Container>
      }
      {action && action.custom !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          <LinkButton onClick = {()=>{action.custom.handle(item,val,event)}} disabled = {props.disabled && props.disabled['custom']}>
          {action.custom.title?action.custom.title:'缺省'}
          </LinkButton>
        </Container>
      }
      {action && action.delete !== undefined &&
        <Container>
          <StyleDiver type="vertical" />
          {props.disabled && props.disabled['delete'] == true ?
            <LinkButton disabled = {true}>删除</LinkButton>:
            <Popconfirm
                title="确定删除?"
                okText="是"
                cancelText="否"
                onConfirm={()=>{action.delete.handle(item)}}
            >
              <LinkButton>删除</LinkButton>
            </Popconfirm>
          }

        </Container>
      }
    </ButtonGroup>
  )
}

export const SwitchBar = ({action,item,description,disabled,checked}:{action?:CellAction;item:any;description?:SwitcherTag;disabled?:boolean;checked?:boolean}) => {
  return (
    <Container>
      {description !== undefined &&
          <StyleTag color={description.color} >{description.name}</StyleTag>
      }
      <Switch
        disabled = {
          disabled !== undefined ? disabled:true
        }
        checked = {checked}
        onClick = {
        (checked:boolean) => {
          if(action){
             action.switch.handle(item,checked)
          }
        }}
      />


    </Container>
  )
}
