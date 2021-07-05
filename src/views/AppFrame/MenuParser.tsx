/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import { Route } from 'react-router-dom';
import { isSubMenuRoute } from './d';

export default function parseMenu(menus:any,routes:JSX.Element[],parentPathName?:string){

  menus.forEach((item:any) => {
    const {subMenu, content, pathname } = item
    let path = pathname;
    if(parentPathName){
      path = `${parentPathName}/${pathname}`
    }

    if(content){
      routes.push(<Route key = {'/' + path} path = {'/' + path} exact = {true}  component={content}/>)
    }

    if(isSubMenuRoute(item)) {
       parseMenu(subMenu,routes,path)
    }
  });

  return (
    routes
  )
}
