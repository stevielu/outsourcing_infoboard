/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { Descriptions} from 'antd';
import { map } from 'lodash';
import styled from 'styled-components';
import Loading from './Spin'
import {HeadFont} from '../../libs/base/base-style'
/********************Layout Style*********************/
const StyledOverview = styled(Descriptions)`

  .ant-descriptions-item{
    padding-bottom:0 !important;
  }

  .ant-descriptions-item-label{
    color:${props => props.theme.fontColor} !important;
    font-size: ${props => props.theme.fontSize} !important;
  }
  .ant-descriptions-item-content{
    color:${props => props.theme.color.blue} !important;
    font-size: ${props => props.theme.titleSize} !important;
    display: inline-table !important;
  }
`

const StyledDetails = styled(Descriptions)`

  .ant-descriptions-item{
    padding-bottom:8px !important;

  }

  .ant-descriptions-item-label{
    color:${props => props.theme.fontColor} !important;
    font-size: ${props => props.theme.fontSize} !important;
  }
  .ant-descriptions-item-content{
    color:${props => props.theme.titleColor} !important;
    font-size: ${props => props.theme.fontSize} !important;
    font-weight:${props => props.theme.fontWeight} !important;
  }
`
const StyledLoading = styled(Loading)`

`
/********************Interface *********************/
export type DescriptionCell = {
  label:string;
  value:React.ReactNode;
};

export type DescriptionsType = {
  title:string;
  descriptions:DescriptionCell[];
}

export type DescriptionsItem = DescriptionsType;



/********************Elements *********************/
export const Details = (props:any) => {
  return (
    <StyledDetails {...props}>{props.children}</StyledDetails>
  )
}

export const Overview = ({desc,loading}:{desc:DescriptionsItem;loading?:boolean}) => {
  const {descriptions} = desc;
  return (
    <StyledOverview>
      {map(descriptions,item => {
        const {label,value} = item;
        return (
          <Descriptions.Item key={label} label={label}>
          {loading === true
            ?<StyledLoading>
              {value}
            </StyledLoading>
            :value
          }

          </Descriptions.Item>
        )
      })}
    </StyledOverview>
  )

}

export const GroupOverview = ({desc,loading}:{desc:DescriptionsItem;loading?:boolean}) => {
  const {descriptions} = desc;
  return (
    <StyledOverview column={4}>
      {map(descriptions,item => {
        const {label,value} = item;
        return (
          <Descriptions.Item key={label} label={label} style={{color:'#558afa',fontSize:'15px',fontWeight:'bold'}}>
          {loading === true
            ?<StyledLoading>
              {value}
            </StyledLoading>
            :value
          }

          </Descriptions.Item>
        )
      })}
    </StyledOverview>
  )
}

export const Title = ({title}:{title:string;}) => {
  return(
    <HeadFont>{title}</HeadFont>
  )
}
