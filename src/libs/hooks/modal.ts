/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{useState} from 'react';
export type ModalProps= {
  visible:boolean;
  close:(e?:any) => void;
  toggle:(e?:any) => void;
  ok:(e?:any) => void;
}

export const useModal = (onOpen?:Function) => {
  const [visible, setVisible] = useState(false)
  const open = React.useCallback((e:any) => {
    setVisible(true)
    if (typeof onOpen === 'function'){
      onOpen(e)
    }
  }, [setVisible])

  const close = React.useCallback((e:any) => {
    setVisible(false)
  }, [setVisible])

  const toggle = (e:any) => {
    setVisible(visible === false?true:false)
  }

  const ok = React.useCallback((e:any) => {
    setVisible(false)
  },[setVisible])

  return {
    visible,
    open,
    close,
    toggle,
    ok,
  }
}
