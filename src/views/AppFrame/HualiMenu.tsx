/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import styled from 'styled-components'
import loggerFacroty from '../../utils/logger';

import { MenuRoute, isSubMenuRoute } from './d';
import HualiIcon from './HualiIcon';

const logger = loggerFacroty('huali-menu');

const { SubMenu, Item } = Menu;
const StyledMenu = styled(Menu)`
  &{
    color: #000000;
    background: transparent !important;
  }
  .ant-menu-sub.ant-menu-inline{
    font-size:12px;
  }
  .ant-menu-item-selected {
    background: #393550;
  }

`
const MenuIcon = styled(HualiIcon)`
margin-right:12px;
`
const HualiMenu = ({
  defaultOpenKeys,
  selectedKeys,
  config,
}: {
  defaultOpenKeys: string[];
  selectedKeys: string[];
  config: MenuRoute;
}) => (
  <StyledMenu
    mode="inline"
    defaultOpenKeys={defaultOpenKeys}
    selectedKeys={selectedKeys}
    style={{fontSize:'12px',fontWeight:500,textAlign:'center'}}
    inlineCollapsed = {true}
  >
    {map(config, item => {
      if (isSubMenuRoute(item)) {
        const { pathname, icon, displayName, subMenu } = item;

        const parentPathname = pathname;
        logger.info('parentPathname', parentPathname);
        return (
          <SubMenu
            title={
              <span style={{display:'flex',alignItems:'center'}}>
                <MenuIcon icon={icon} />
                <span>{displayName}</span>
              </span>
            }
            key={'/' + parentPathname}
          >
            {map(subMenu, ({ pathname, icon, displayName }) => {
              const path = `/${parentPathname}/${pathname}`;

              logger.info(path);

              return (
                <Item key={path}>
                  <Link
                    to={{
                      pathname: path,
                    }}
                  >
                    <MenuIcon icon={icon} />
                    <span>{displayName}</span>
                  </Link>
                </Item>
              );
            })}
          </SubMenu>
        );
      }
      const { pathname, icon, displayName } = item;
      const path = '/' + pathname;

      logger.info(path);

      return (
        <Item key={path}>
          <Link
            to={{
              pathname: path,
            }}
          >
            <MenuIcon icon={icon} />
            <span>{displayName}</span>
          </Link>
        </Item>
      );
    })}
  </StyledMenu>
);

export default HualiMenu;
