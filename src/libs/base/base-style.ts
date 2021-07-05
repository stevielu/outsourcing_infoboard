/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import styled,{createGlobalStyle} from 'styled-components';
import {Button,Menu,Layout,Card,Table,Divider,Space,Descriptions} from 'antd'
import digitalFont from '../../assets/font/digital.ttf'
/********************Color Style*********************/
export const primary = '#FFFFFF'
export const sub = '#2C3753'
export const black = '#666666'
export const bold = '#333333'
export const grey = '#E0E0E0'
export const disabled = '#999999'
export const gold = '#DAA520'

/*blue*/
export const blue = '#558AFA'
export const maya = '#718CCF'
/*green*/
export const green = '#32C50B'

/********************Icon *********************/
const icon = {

}

/********************Theme Style*********************/
export const theme = {
  color:{
    primary,
    sub,
    black,
    grey,
    gold,
    blue,
    maya,
    disabled,
    green,
  },
  icon:icon,
  background: primary,
  subColor:sub,
  borderColor:grey,
  fontColor:black,
  titleColor:bold,
  borderWidth:"1px",
  fontWeight:600,
  fontSize:'12px',
  titleSize:'14px',
  headTitle:'24px',
  padding:'16px',
  margin:'8px',
  minorSpacing:'8px',
  normarlSpacing:'16px',
  largeSpacing:'24px',
  horizontalSpacing:'24px 0',
  veticalSpacing:'0 16px'
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: LcdD;
    src: url(${digitalFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

`;

/********************Layout Style*********************/
export const StyledLayout = styled(Layout)`
  height: 100vh;
  display: flex;
`;

/*content*/
export const StyledBlock = styled.div`
  padding: 0 ${props => props.theme.margin};
  display: block;
`;

export const StyledSpan = styled.span`
  margin: 0 ${props => props.theme.margin} 0 0;
  display: inline;
`;

/*submenu*/
export const HLMenu = styled(Menu)`
  .ant-menu-dark{
  background-color:#FFFFFF!important;
  }
`;


/********************Font Style*********************/
export const HeadFont = styled.p`
  font-size:  ${props => props.theme.headTitle};
  color: ${props =>  props.color || props.theme.titleColor};
  margin: 0;
`;

export const TitleFont = styled.p`
  font-size:  ${props => props.theme.titleSize};
  color: ${props => props.color ||props.theme.titleColor};
  margin: 0;
  font-weight: ${props => props.theme.fontWeight};
`;
export const BoldFont = styled.p`
  font-size:  ${props => props.theme.titleSize};
  color: ${props => props.color ||props.theme.titleColor};
  margin: 0;
  font-weight: ${props => props.theme.fontWeight};
  display:inline;
`;

export const ExtraLongFont = styled.p`
  font-size:  ${props => props.theme.titleSize};
  color: ${props => props.color ||props.theme.fontColor};
  margin: 0;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;


export const ContentFont = styled.p`
  margin: 0 !important;
  vertical-align: middle;
  display: inline-block;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.color || props.theme.fontColor};
`;

export const NoWrapContentFont = styled.p`
  margin: 0 !important;
  vertical-align: middle;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.color || props.theme.fontColor};
`;


export const TitleFontInline = styled.p`
  font-size:  ${props => props.theme.titleSize};
  color: ${props => props.color ||props.theme.titleColor};
  margin: 0;
  display:contents;
`;

export const BlueContentFont = styled.p`
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.color || props.theme.color.maya};
  display:contents;
`;

export const GreenContentFont = styled.p`
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.color || props.theme.color.green};
  display:contents;
`;
export const DisabledContent = styled.p`
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.color || props.theme.color.disabled};
  display:contents;
`;



/********************Button Style*********************/
export const PrimaryButton = styled(Button).attrs(props => ({
  type:'primary',
}))`
`;

export const SecondaryButton = styled(Button).attrs(props => ({
  type:'default',
}))`
`;

export const LinkButton = styled(Button).attrs(props => ({
  type:'link',
}))`
  padding:0 !important;
  color:${props => props.theme.color.maya};
  font-size: ${props => props.theme.fontSize} !important;
`;

export const IconButton = styled(Button).attrs(props => ({
  type:'link',
}))`
  color:${props => props.theme.color.maya} !important;
`;


export const Link = styled.a`
`;

export const Container = styled.div`

`;


/********************Table Style*********************/
export const StyledTable = styled(Table)`
  padding-top: ${props => props.theme.padding};
  .ant-table{
    font-size: ${props => props.theme.fontSize} !important;
  }
`
/********************Descriptions Style*********************/
export const StyledDetails = styled(Descriptions)`
  .ant-descriptions-item{
    padding-bottom:10px !important;
  }
  .ant-descriptions-item-label{
    color:${props =>props.theme.color.disabled}
  }
`
/********************Other Style*********************/
export const StyledCard = styled(Card)`
 overflow:hidden;
 box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
 border-radius: 0.5em !important;
 border:none;
 height:100%;
 display:table-cell;
 .ant-card-head-title{
   text-align:center !important;
 }

`

export const MapCard = styled(Card)`
 box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
 border-radius: 0.5em !important;
 margin-bottom:${props => props.theme.margin};
 .ant-card-body{
   padding:0 !important
   height:720px;
 }
`

export const HDivider = styled(Divider)`
  margin:${props => props.theme.margin} 0 !important;
`
export const HSpace = styled(Space).attrs(props => ({

}))`
`
