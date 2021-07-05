/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { map } from 'lodash';
import { Menu } from 'antd';

/********************Interface *********************/
export type MenuClickHandle = (e:any) => void

export type DropMenuType = {
  displayName: string;
  content?:JSX.Element;
  key:string;
  icon: string | JSX.Element;
};

export type DropMenuItems = DropMenuType[];

/********************Elements *********************/
export const DropMenu = ({config,click}:{config:DropMenuType[];click?:MenuClickHandle;}) => (
  <Menu onClick={click} >
    {map(config, item => {
      const {displayName, key,content} = item;
      return (
        <Menu.Item key={key}>
          {content == undefined ? displayName:content}
        </Menu.Item>
      )
    })
    }
  </Menu>
)
