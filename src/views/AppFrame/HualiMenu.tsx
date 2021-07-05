/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import loggerFacroty from '../../utils/logger';

import { MenuRoute, isSubMenuRoute } from './d';
import HualiIcon from './HualiIcon';

const logger = loggerFacroty('huali-menu');

const { SubMenu, Item } = Menu;

const HualiMenu = ({
  defaultOpenKeys,
  selectedKeys,
  config,
}: {
  defaultOpenKeys: string[];
  selectedKeys: string[];
  config: MenuRoute;
}) => (
  <Menu
    theme="dark"
    mode="inline"
    defaultOpenKeys={defaultOpenKeys}
    selectedKeys={selectedKeys}
  >
    {map(config, item => {
      if (isSubMenuRoute(item)) {
        const { pathname, icon, displayName, subMenu } = item;

        const parentPathname = pathname;
        logger.info('parentPathname', parentPathname);
        return (
          <SubMenu
            title={
              <span>
                <HualiIcon icon={icon} />
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
                    <HualiIcon icon={icon} />
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
            <HualiIcon icon={icon} />
            <span>{displayName}</span>
          </Link>
        </Item>
      );
    })}
  </Menu>
);

export default HualiMenu;
