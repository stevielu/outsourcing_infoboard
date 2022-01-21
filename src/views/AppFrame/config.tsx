/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Home from '../Home'
import Board from '../Board'
import Template from '../Manage/Template'
import manage_ico from '../../assets/menu/manage.svg'
import config_ico from '../../assets/menu/config.svg'


import { MenuRoute } from './d';

export default [
  {
    pathname: 'view',
    displayName: '决策管理指挥',
    icon: manage_ico,
    subMenu: [
      {
        pathname: 'show',
        displayName: '处置行动数据展示',
        icon: '',
        content:Board
      },
      {
        pathname: 'test',
        displayName: '处置行动数据管理',
        icon: '',
        content:Home
      },
    ]

  },
  {
    pathname: 'manage',
    displayName: '系统管理',
    icon: config_ico,
    subMenu: [
      {
        pathname: 'template',
        displayName: '预案模版管理',
        icon: '',
        content:Template
      },

    ]

  },
] as MenuRoute;


export const header = [

] as MenuRoute;
