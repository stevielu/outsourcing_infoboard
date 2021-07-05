/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

// 状态管理
import { useState, useEffect } from 'react';

import MessageChannel from './message-channel';

export default class Store {
  // 实例化一个消息中心
  private channel = new MessageChannel();
  // 每次更新时,更新储存的 state 的值
  // 这样每次调用 React.useState 时都能使用最新的值去初始化
  private state: Map<string, any> = new Map();

  constructor(){
    this.toEventName.bind(this)
    this.createState.bind(this)
    this.useState.bind(this)
  }
  // 将变量名转换为事件名
  private toEventName(name: string) {
    return `set_${name}`;
  }
  // 创建一个新的state
  public createState<T>(name: string, initialVal: T): void {
    this.state.set(name, initialVal);
  }

  // 暴露出的 Hook Api
  public useState<T>(name: string): [T, (val: T) => void] {
    const eventName = this.toEventName(name);
    const [individualState, _setIndividualState] = useState(this.state.get(name));

    // 在 mount 的时候订阅消息, 并在unmount的时候取消订阅
    useEffect(() => {
      this.channel.subscribe(eventName, _setIndividualState);
      return () => {
        this.channel.unsubscribe(eventName, _setIndividualState);
      }
    }, []);

    // return 的 setter 函数
    // 更新 map 中的 state, 并通过 channel publish 给所有订阅者
    const setIndividualState = (value: T) => {
      this.state.set(name, value);
      this.channel.publish(eventName, value);
    }

    return [individualState, setIndividualState];
  }
}
