/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { AppState } from '../reducers';

export const tableConfig = (state: AppState) => state['config']['table'];
export const reloadFlag = (state: AppState) => state['config']['reload'];
