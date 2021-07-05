/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { combineReducers } from 'redux';

import {tableReducer} from './table';
import {reloadReducer} from './reload'

export default combineReducers({
  table: tableReducer,
  reload:reloadReducer,
});
