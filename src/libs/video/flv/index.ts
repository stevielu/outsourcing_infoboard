/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Player,{VideoStatus} from '../player'
import FlvJs from 'flv.js'

export default class FLVPlayer implements Player{
  public type:string = '';
  public url:string = '';
  public autoPlay:boolean = true;
  public wrapper:HTMLMediaElement|null = null;
  public status = VideoStatus.Unload;
  private _palyer:FlvJs.Player;

  constructor(props:Partial<FLVPlayer>){
    Object.assign(this,props)

    this._palyer = FlvJs.createPlayer({
      type: this.type,
      url: this.url
    })

    if(this.wrapper){
      this._palyer.attachMediaElement(this.wrapper)
    }

    if(this.autoPlay == true){
      this.play()
    }

    this._palyer.on('ERROR',(err)=>{
      this.status = VideoStatus.Error
    })
  }

  get currentTime(){
    return this._palyer.currentTime
  }

  destroy = () => {
    this._palyer.destroy()
    this.status = VideoStatus.Closed
  }

  play = (url?:string) => {
    return new Promise<Player>((resolve,reject) =>{
      if(this.status != VideoStatus.Paused){
        this._palyer.load()
        this.status = VideoStatus.Loading
      }

      const p = this._palyer.play() as Promise<void>
      if(p){
        p.then(_ =>{
          this.status = VideoStatus.Playing
          resolve(this)
        }).catch(err =>{
          this.status = VideoStatus.Error
          reject(err)
        })
      }


    })
  }

  pause = () => {
    this.status = VideoStatus.Paused
    this._palyer.pause()
  }

}
