interface PlaybackObj {
  time_stamp:number;
}
interface Task {
  [name:string]:PlaybackTimer
}

export class PlayBackTimmerManager{
  private static instance: PlayBackTimmerManager;
  private _startTime:number = 0 ;
  private _endTime:number = 0 ;
  private _timerStamp:number = 0 ;
  public callback?:(timer:number)=>void
  constructor(){

  }

  public static getInstance(): PlayBackTimmerManager {
      if (!PlayBackTimmerManager.instance) {
          PlayBackTimmerManager.instance = new PlayBackTimmerManager();
      }
      return PlayBackTimmerManager.instance;
  }

  set startTime(value:number){
    this._startTime = value
  }

  get startTime(){
    return this._startTime
  }

  set endTime(value:number){
    this._endTime = value
  }

  get endTime(){
    return this._endTime
  }

  set timeStamp(value:number){
    this._timerStamp = value
    if(this.callback){
      this.callback(value)
    }
  }

  get timeStamp(){
    return this._timerStamp
  }
}


class PlaybackTimer{
  timerId:number
  start:number
  remaining:number
  callback:() => void

  constructor(callback:() => void,delay:number){
    this.timerId = 0
    this.start = 0
    this.remaining = delay
    this.callback = callback
    this.resume()
  }

  begin = (callback:()=>void,delay:number) => {
    clearTimeout(this.timerId);
    this.timerId = window.setTimeout(callback, delay);
  }

  pause = () => {
    clearTimeout(this.timerId)
    this.remaining -= Date.now() - this.start;
  }

  resume = () => {
      this.start = Date.now();
      clearTimeout(this.timerId);
      this.timerId = window.setTimeout(this.callback, this.remaining);
  };

  destory = () => {
    this.remaining = 0
    clearTimeout(this.timerId);
  }
}

class PlayBackController {
  private  _index  = 0
  private  timmer:PlaybackTimer|null = null
  private _name = ''
  taskFullfill?:any


   playback<T extends PlaybackObj>(name:string,startTime:number,data:T[],callBack:(data:T)=>void){
     this._name = name
    return new Promise((resolve,reject) => {
      this.parseData(startTime,data,callBack,resolve,name)
    })
  }

   parseData<T extends PlaybackObj>(startTime:number,data:T[],callBack:(data:T)=>void,resolve:(value?:T[]|PromiseLike<T[]>|undefined)=>void,name:string){
    const x = this._index
    const that = this
    this.taskFullfill = resolve
    if(x + 1 < data.length){

        let dur = data[x+1].time_stamp - data[x].time_stamp
        const timmerFunc = function(){
          callBack(data[x])
          that._index += 1
          that.parseData(startTime,data,callBack,resolve,name)
        }
        if(dur >= 0){
          if(this.timmer == null){
            dur = data[x].time_stamp - startTime
            this.timmer = new PlaybackTimer(timmerFunc,dur)
          }else{

            this.timmer.begin(timmerFunc,dur)
          }
        }
    }else{
      this._index = 0
      resolve(data)
    }
  }

  stopPlay(){
    if(this.timmer){
      this.timmer.pause()

    }

  }

  resumePlay(){
    if(this.timmer){
      this.timmer.resume()

    }

  }

  closePlay(){
    if(this.timmer){
      this.timmer.destory()
      this.timmer = null
      this._index = 0
      if(this.taskFullfill != undefined){
        this.taskFullfill(undefined)
      }
    }
  }
}

export default PlayBackController
