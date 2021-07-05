/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import loggerFactory from './logger';

it('creates logger with out problem', () => {
  loggerFactory('test');
});

it('has all three functions', () => {
  const logger = loggerFactory('test');

  logger.info('abc');
  logger.error('abc');
  logger.warning('abc');
});
