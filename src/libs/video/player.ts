/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
export enum VideoStatus{
  Unload,
  Loading,
  Playing,
  Paused,
  Closed,
  Error
}

interface PlayerApi{
  url:string;
  type:string;
  autoPlay:boolean;
  currentTime: Readonly<number>;
  destroy:()=>void;
  play:()=>Promise<PlayerApi>;
  pause:()=>void;
  status:VideoStatus;
}

export default PlayerApi
