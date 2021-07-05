/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import { map } from 'lodash';
import { Switch, Route } from 'react-router-dom';
import {Breadcrumb} from 'antd'
import styled from 'styled-components';

import { MenuRoute, isSubMenuRoute } from './d';

const StyledBreadcrumb = styled(Breadcrumb)`
  padding:24px;
`

const HLBreadcrumb = ({ config }: { config: MenuRoute }) => (
  <Switch>
      {map(config, item => {
        if (isSubMenuRoute(item)) {
          const { subMenu, pathname,displayName } = item;
          const parentPathname = pathname;
          const rootName = displayName;

          return map(subMenu, item => {
            const { pathname,displayName } = item;
            const path = `/${parentPathname}/${pathname}`;


            return (
              <Route key={path} path={path}>
                <StyledBreadcrumb>
                  <Breadcrumb.Item key={parentPathname}>{rootName}</Breadcrumb.Item>
                  <Breadcrumb.Item key={path}>{displayName}</Breadcrumb.Item>
                </StyledBreadcrumb>
              </Route>
            );
          });
        }

        const {pathname,displayName} = item;
        const path = '/' + pathname;

        return (
          <Route key={path} path={path}>
            <StyledBreadcrumb>
              <Breadcrumb.Item key={path}>{displayName}</Breadcrumb.Item>
            </StyledBreadcrumb>
          </Route>
        );
      })}
  </Switch>

);

export default HLBreadcrumb;
