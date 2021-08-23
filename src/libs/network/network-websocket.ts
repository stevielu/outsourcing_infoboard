/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

export type SocketProps = {
  socketUrl:string;
  timeout:number;
  rcvType?:'Promise'|'Default'
  socketOpen?:()=>void;
  socketMessage?:(data:any)=>void;
  socketClose?:(e:any)=>void;
  socketError?:(e:any)=>void;
  namespace?:string

}

export enum EventCode {
  CLOSE = 1000,//主动关闭
  CLOSE_FAIL = 1006,
  FAIL = 500,//失败 重连
  SUCCESS = 200,//连接成功
}
class EasyWebSocket {
  param:SocketProps;
  reconnectCount:number = 0;
  socket:{[name:string]:WebSocket} = {};
  taskRemindInterval:any = null;
  isSucces = true;
  onResponse?:<T>(data:T)=>void;
  private _path?:string;

  constructor(param:SocketProps) {
      this.param = param;
      this.param.rcvType = param ? param.rcvType:'Default'
      this.reconnectCount = 0;
      this.taskRemindInterval = null;
      this.isSucces=true;
  }

    public connection = (path?:string) => {
        return new Promise<{event:Event,socket:WebSocket}>((resolve,reject)=>{
          if(!path){
            return reject(`connection error ${this.param.namespace} , request url was invalid.`);
          }
          this._path = path


          this.socket[path] = new WebSocket(this.param.socketUrl+path);
          this.socket[path].onclose = this.onclose;
          this.socket[path].onerror = this.onerror;

          this.socket[path].onopen = (e) => {
            this.onopen()
            resolve({socket:this.socket[path],event:e})
          };

          // 检测返回的状态码 如果socket.readyState不等于1则连接失败，关闭连接
          if(this.param.timeout) {
              let time = window.setTimeout(() => {
                   if(this.socket && this.socket[path].readyState !== 1) {
                       this.socket[path].close();
                       reject('initial connection fail...');
                   }
                   clearInterval(time);
              }, this.param.timeout);
          }

        })


    };

    // 连接成功触发
    onopen = () => {
        this.isSucces=false  //连接成功将标识符改为false
    };


    onMessage = <T>(callback?:(e:T) => void,path?:string) => {
      if(this.socket){
        const key = path?path:this._path
        if(key == undefined){
          console.log('can not fetch message,socket url was null.')
          return
        }
        if(this.socket[key]){
          this.socket[key].onmessage = (e) => {
            const obj:T = JSON.parse(e.data);
            if(callback){
              callback(obj)
            }else if(this.onResponse){
              this.onResponse<T>(obj)
            }

          }
        }

      }
    }

    // 关闭连接触发
    onclose = (e:any) => {
        this.isSucces=true   //关闭将标识符改为true
        console.log('关闭socket收到的数据',e);
        // 根据后端返回的状态码做操作
        // 我的项目是当前页面打开两个或者以上，就把当前以打开的socket关闭
        // 否则就20秒重连一次，直到重连成功为止
        if(e.code== EventCode.FAIL){
            this.taskRemindInterval = window.setInterval(()=>{
                if(this.isSucces){
                    this.connection(this._path);
                }else{
                    clearInterval(this.taskRemindInterval)
                }
            },20000)
        }
    };

    onerror = (e:any) => {
        // socket连接报错触发
        let {socketError} = this.param;
        socketError && socketError(e);
    };

    sendMessage = (value:Object,key:string) => {
        // 向后端发送数据
        if(this.socket) {
            this.socket[key].send(JSON.stringify(value));
        }
    };

    closeSocket = (key?:string) =>{
      const path = key?key:this._path
      if(path == undefined){
        console.log('can not close socket.')
        return
      }

      if(this.socket && this.socket[path] && this.socket[path].readyState == WebSocket.OPEN) {
        this.socket[path].close()
      }else{
        console.log(`socket ${path} was not open`)
      }
    }
};

export default EasyWebSocket
