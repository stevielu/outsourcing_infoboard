/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React, { useState, useCallback,useEffect } from 'react';
import { Link, Switch,Route,useHistory,useLocation } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'

import { Layout,Row,Col} from 'antd';
import AuthManager from '../../libs/auth';
import HualiMenu from './HualiMenu';
import HualiContent from './HualiContent';
import { LogoImg } from '../Components'

import {setStatus} from '../../libs/auth/store'
import logo from '../../assets/common/logo.png'
import config from './config';
import {theme,StyledLayout} from '../../libs/base/base-style'
import styled,{ ThemeProvider } from 'styled-components';
import { split, join, slice } from 'lodash';
const { Header, Sider, Content } = Layout;

const Logo = styled(LogoImg)`
  width: 168px !important;
  margin: 16px;
`;

const StyledTop = styled.div`
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  height: 64px;
`;

const StyledContent = styled(Content)`
  margin: 0;
  padding: 0;
  min-height: 100% !important;
  display:table;
`;
// TODO @changran remove important
const StyledHeader = styled(Header)`
  background: #fff !important;
  padding: 0 !important;
  height: fit-content !important;
`;
const IS_SIDE = undefined
export const Main =  () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [
    setCollapsed,
    collapsed,
  ]);
  const pathParts = split(pathname, '/');
  const firstPart = slice(pathParts, 1, 2).map(item => '/' + item);
  const firstAndSecondPart = slice(pathParts, 0, 3);
  const activeKey = join(firstAndSecondPart, '/');

  return (
    <ThemeProvider theme={theme}>
      {IS_SIDE &&
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link
            to={{
              pathname: '/',
            }}
          >
            <Logo/>
          </Link>
          <HualiMenu
            config={config}
            defaultOpenKeys={firstPart}
            selectedKeys={[activeKey]}
          />
        </Sider>
      }

      <Layout>
        <StyledContent>
          <HualiContent config={config} />
        </StyledContent>
      </Layout>

    </ThemeProvider>
  );
};

export default ()=>{
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const loginState = useSelector((state:any)=>{
  //   return state['auth']
  // })
  // useEffect(()=>{
  //   AuthManager.Instance().onRedirect(()=>{
  //     dispatch(setStatus(false))
  //   })
  //   AuthManager.Instance().onLoginSuccess(()=>{
  //     dispatch(setStatus(true))
  //     history.push('/')
  //   })
  // },[])

  // useEffect(()=>{
  //   if(loginState.isAuthenticated == false){
  //     history.push('/auth')
  //   }
  // },[loginState.isAuthenticated])
  return (
    <ThemeProvider theme={theme}>
      <StyledLayout>
      <Switch>
        <Route key = {'/'} path = {'/'}   component={Main}/>
      </Switch>

      </StyledLayout>

    </ThemeProvider>
  )
}
