/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import PlayerApi from './player'
import FlvPlayer from './flv/'

export enum VideoPlayerType{
  FLVJS,
}

export type VideoProps = {
  url:string;
  type:string;
  width:number;
  height:number;
  onClose?:() => void;
  manager?:VideoPlayerManager
  autoPlay?:boolean;
  cRef?:any;
}

export default class VideoPlayerManager{
  private _type:VideoPlayerType = VideoPlayerType.FLVJS//默认FLVjs
  constructor(type?:VideoPlayerType){
    if(type){
      this._type = type
    }
  }

  public create(param:VideoProps,wrapper:HTMLVideoElement):PlayerApi{
    switch(this._type){
      case VideoPlayerType.FLVJS:
        return new FlvPlayer({...param,wrapper:wrapper})
      default:
        return new FlvPlayer({...param,wrapper:wrapper})
    }
  }
}
