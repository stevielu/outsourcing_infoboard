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
import Avatar from './Avatar'


import config from './config';
import {theme,StyledLayout,TitleFont} from '../../libs/base/base-style'
import styled,{ ThemeProvider } from 'styled-components';
import { split, join, slice } from 'lodash';
const { Header, Sider, Content } = Layout;

const Logo = styled(TitleFont)`
  font-size: 24px;
  color: #393550;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  text-align: center;
  font-weight: 900;
  margin: 10px;
`;

const StyledSider = styled(Sider)`
  background:#fff;
`;

const StyledContent = styled(Content)`
  flex: auto;
  min-height: 0;
  align-content: center;
  display: flex;
`;
// TODO @changran remove important
const StyledAvatar = styled(Avatar)`
  width:100px;
`;
const IS_SIDE = true
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
        <StyledSider trigger={null} collapsible collapsed={collapsed}>
          <Link
            to={{
              pathname: '/',
            }}
          >
            <Logo>处置突发事件决策指挥辅助系统</Logo>
          </Link>
          <StyledAvatar name={'张三'} subTitle={'指挥处处长｜参谋部'}/>
          <HualiMenu
            config={config}
            defaultOpenKeys={firstPart}
            selectedKeys={[activeKey]}
          />
        </StyledSider>
      }

      <Layout style={{background:'#fff'}}>
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
