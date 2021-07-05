/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import debug from 'debug';
import {message} from 'antd'
import {MessageType} from 'antd/lib/message'
class Logger {
  namespace: string;
  hide?:MessageType;
  constructor(namepsace: string) {
    this.namespace = namepsace;
    message.config({
      top: 100,
      duration: 2,
      maxCount: 1,
      rtl: false,
    });
  }
  info(msg: string, ...arg: any[]) {
    debug(`huali:info:${this.namespace}`)(msg, ...arg);
  }
  error(msg: string, ...arg: any[]) {
    debug(`huali:err:${this.namespace}`)(msg, ...arg);
  }
  warning(msg: string, ...arg: any[]) {
    debug(`huali:warning:${this.namespace}`)(msg, ...arg);
  }

  successAlert(msg: string){
    message.success(msg)
  }
  errorAlert(msg: string,...arg: any[]){
    message.error(msg)
  }

  loading(msg: string){
     this.hide = message.loading(msg,0)
     console.log(this.hide)
  }

  hideLoading(){
    if(this.hide){
      this.hide()
    }
  }
}

export default (namespace: string) => new Logger(namespace);
