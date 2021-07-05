/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{FunctionComponent} from 'react'
import {Select,Radio} from 'antd'
import { map } from 'lodash';
import {CaretDownOutlined} from '@ant-design/icons'


const { Option } = Select;
export interface SelectType {
  displayName: string;
  content?:JSX.Element;
  key:string;
  icon: string | JSX.Element;
};

export interface SelectProps{
  title?:string;
  config?:SelectType[];
  click?:(value:any) => void;
  selectedValue?:any;
  other?:any;
  isCouple?:boolean;
  initialValue?:any;
}

export const SelectMenu:FunctionComponent<SelectProps> = (props) => {
  return (
    <Select
      {...props}
      placeholder = {props.title}
      onChange = {props.click}
      value = {props.selectedValue} 
      defaultValue = {props.initialValue}
      {...props.other}
      suffixIcon = {<CaretDownOutlined />}

    >
      {props.config && map(props.config, item => {
        const {displayName, key} = item;
        return (
          <Option key={key} value={key}>{displayName}</Option>
        )
      })
      }
    </Select>
  )
}

export const FormSelectMenu:FunctionComponent<SelectProps> = (props) => {
  return (
    <Select
      placeholder = {props.title}
      suffixIcon = {<CaretDownOutlined />}
      {...props}
    >
      {props.config && map(props.config, item => {
        const {displayName, key} = item;
        return (
          <Option key={key} value={key}>{displayName}</Option>
        )
      })
      }
    </Select>
  )
}

export const RadioMenu:FunctionComponent<SelectProps> = (props) => {
  const onChangeHandle = (e:any) => {
    if(e.target.value && props.click){
      props.click(e.target.value)
    }
  }
  return (
    <Radio.Group onChange={onChangeHandle} value = {props.selectedValue}>
      {props.config && map(props.config, item => {
        const {displayName, key} = item;
        return (
          <Radio key={key} value={key}>
            {displayName}
          </Radio>
        )
      })
      }
    </Radio.Group>
  )
}
