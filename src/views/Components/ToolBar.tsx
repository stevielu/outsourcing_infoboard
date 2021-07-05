/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { Link } from "react-router-dom";
import { map } from 'lodash';
import styled from 'styled-components';
import { Row, Col, Input } from 'antd';


import { PrimaryButton,SecondaryButton,StyledSpan } from '../../libs/base/base-style'



const RightCol = styled(Col)`
  text-align:right;
`

const { Search } = Input;


export type ToolBarElementsType<T> = {
  primaryButtons?:T[];
  secondaryButtons?:T[];
  searchBar?:T;
  customize?:JSX.Element
}




export type ElementsValue = {
  title:string;
  link?:string;
  handle?: (e: any) => void;
  content?:string|JSX.Element
}

export const ToolBar = ({overlay,child}:{overlay:ToolBarElementsType<ElementsValue>;child?:JSX.Element}) => {

  return(
    <Row>
      <Col xl={12} sm={15}>
        {map(overlay.primaryButtons,item =>{
          const {title,handle,content,link} = item
            return (
              <StyledSpan key={title}>
                {(link !== undefined) ?
                  <Link to={link} replace>
                    <PrimaryButton onClick={handle}>{title}</PrimaryButton>
                  </Link>
                  :<PrimaryButton onClick={handle}>{title}</PrimaryButton>
                }

                {content}
              </StyledSpan>
            )
          })
        }
        {map(overlay.secondaryButtons,item =>{
          const {title,handle,content} = item
            return (
              <StyledSpan key={title}>
                <SecondaryButton onClick={handle}>{title}</SecondaryButton>
                {content}
              </StyledSpan>
            )
          })
        }
      </Col>
      <RightCol xl={6} sm={3} offset={3}>
      {overlay.searchBar !== undefined &&
          <Search
            placeholder={overlay.searchBar.title}
            onSearch={value => {
              if(overlay.searchBar && overlay.searchBar.handle){
                overlay.searchBar.handle(value)
              }
            }}
          />
      }
      </RightCol>
      <RightCol xl={3} sm={3}>
      {overlay.customize !== undefined &&
          overlay.customize
      }
      </RightCol>
    </Row>
  )
}
