/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { random } from 'lodash';

import HualiIcon from './HualiIcon';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders string as icon', () => {
  act(() => {
    ReactDOM.render(<HualiIcon icon="abc" />, container);
  });
  const icon = container.querySelector('.anticon');
  expect(icon).toBeDefined();
});

it('renders string as icon', () => {
  const randomClass = `test${random()}`;

  act(() => {
    ReactDOM.render(
      <HualiIcon icon={<div className={randomClass} />} />,
      container
    );
  });
  const icon = container.querySelector(`.${randomClass}`);
  expect(icon).toBeDefined();
});
