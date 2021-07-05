/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {
  useModal,
  useRequest,
  useCopy,
  copy,
  useUnlockEditor,
  usePagination,
  useList,
} from './hooks'

import formatter from './base/formatter'
/*Type*/

/*retrieve element type from a array*/
export type ArrayElement<A> = A extends (infer T)[] ? T : never

export {
  useModal,
  useRequest,
  useCopy,
  copy,
  formatter,
  useUnlockEditor,
  usePagination,
  useList
}
