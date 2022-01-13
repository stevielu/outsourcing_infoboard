/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{FunctionComponent} from 'react';
import { isString } from 'lodash';

import { HualiIcon as TypeHualiIcon } from './d';

type IconProps = {
  icon:TypeHualiIcon
}
const HualiIcon:FunctionComponent<IconProps> = (props) => {
  if (isString(props.icon)) {
    return <img src = {props.icon} {...props}></img>;
  }

  const CurrentIcon = props.icon;

  return CurrentIcon;
};

export default HualiIcon;
