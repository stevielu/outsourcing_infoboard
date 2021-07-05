/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { combineReducers } from 'redux';
import configReducer from './config'
import auth from '../libs/auth/store'
const rootReducer = combineReducers({
  config:configReducer,
  auth:auth,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
