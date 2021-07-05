/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import { isString } from 'lodash';

import { HualiIcon as TypeHualiIcon } from './d';

const HualiIcon = ({ icon }: { icon: TypeHualiIcon }) => {
  if (isString(icon)) {
    return <div></div>;
  }

  const CurrentIcon = icon;

  return CurrentIcon;
};

export default HualiIcon;
