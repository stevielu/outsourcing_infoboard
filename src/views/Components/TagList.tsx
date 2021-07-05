/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React from 'react'
import {Tag,Row,Col} from 'antd'
import { map } from 'lodash';


type TagType = {
  displayName: string;
  key:string;
};

export const TagList = ({config,onClose}:{config?:TagType[];onClose?:(value:any) => void;}) => {

  return (
    <Row>
      {config && map(config, item => {
        const {displayName, key} = item;
        return (
          <Col span = {24}>
            <Tag key={key} onClose = {onClose}>{displayName}</Tag>
          </Col>
        )
      })
      }
    </Row>
  )
}
