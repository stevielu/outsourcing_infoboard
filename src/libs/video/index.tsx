/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React,{useEffect,useState,forwardRef,Ref,useRef,useImperativeHandle} from 'react'
import VideoPlayerManager,{VideoPlayerType,VideoProps} from './player-factory'
import PlayerApi from './player'
import closeSvg from './assets/square-close.svg'

 const HLVideo = forwardRef((props:VideoProps,ref?:Ref<HTMLVideoElement>) => {
  const [manager] = useState(props.manager ? props.manager:new VideoPlayerManager())
  const [player,setPlayer] = useState<PlayerApi>()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    if(videoRef.current){
     const player =  manager?.create({...props},videoRef.current)
     setPlayer(player)
    }
  },[])

  useImperativeHandle(props.cRef, () => {
    return {player:player}
  },[player])
  return (
    <video ref = {videoRef} muted={true} {...props}>
    </video>
  )
})

export default HLVideo
