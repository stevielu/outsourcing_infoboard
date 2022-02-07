/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useState} from 'react';
import {ContentFont,Container,HeadFont,TitleFont } from '../../libs/base/base-style'
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import './index.css'
const Wrapper = styled(Container)`
    display: flex;
    align-items: center;
`
const okCss = {
width: '120px',
height: '50px',
background: '#393550',
borderRadius: '9px'
}
export const useModal = () =>{
  const [visible,setVisible] = useState(false);
  const showModal = () => {
    setVisible(true)
  };

  const closeModal = () => {
    setVisible(false)
  };

  return {visible,showModal,closeModal}
}
const StyledModal = styled(Modal)`
border-radius:12px;
`
const App:FunctionComponent<{title:string;visible:boolean;close:()=>void;ok:<T>(value?:T)=>void}> = (props) => {


  const handleOk = e => {
    props.ok(e)
    props.close()
  };


  return(


      <>
          <StyledModal
            closable={false}
            title={props.title}
            visible={props.visible}
            onOk={handleOk}
            onCancel={props.close}
            okButtonProps={{ style: okCss }}
            cancelButtonProps={{ type: 'text' }}
            okText="保存"
            cancelText="取消"
            wrapClassName={'styledModal'}
          >
            {props.children}
          </StyledModal>
        </>
  )
};


export default App
