/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

// 发布-订阅者模式
export type CallBackType = (...args: any[]) => any;

export default class MessageChannel {
  private readonly events: { [eventName: string]: CallBackType[] } = {};
  constructor(){
    this.hasEvent.bind(this)
    this.publish.bind(this)
    this.subscribe.bind(this)
    this.unsubscribe.bind(this)
  }

  public hasEvent(eventName: string) {
    return this.events[eventName] !== undefined && this.events[eventName].length > 0;
  }

  public publish(eventName: string, ...args: any[]) {
    if (this.events[eventName] === undefined) return;
    this.events[eventName].forEach(c => {
      c(...args);
    });
  }

  public subscribe(eventName: string, callback: CallBackType) {
    if (this.events[eventName] === undefined)
      this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: CallBackType) {
    if (this.events[eventName] === undefined) return;
    this.events[eventName] = this.events[eventName].filter(c => c !== callback);
  }
}
