import { BackIcon } from "./Icon"
import React,{FunctionComponent,useEffect  } from 'react'
import { Link } from "react-router-dom";


const Brackets:FunctionComponent = (props) => {
  let canvasWraper: HTMLCanvasElement | null = null
  useEffect(() => {
    if (canvasWraper != null) {
      const context = canvasWraper.getContext('2d')
      if (context) {
        context.moveTo(7.5, 4);
        context.lineTo(3.5, 10);
        context.lineTo(3.5, 77);
        context.lineTo(7.5, 82);
        context.lineWidth = 2;          //设置线宽状态
        context.strokeStyle = '#979797';  //设置线的颜色状态
        context.stroke();
        context.beginPath();
        context.arc(8.5, 3.5, 2.5, 0, 2 * Math.PI);
        context.fillStyle = "#D8D8D8";
        context.fill();
        context.stroke();
        context.beginPath();
        context.arc(3.5, 43.5, 2.5, 0, 2 * Math.PI);
        context.fillStyle = "#D8D8D8";
        context.fill();
        context.stroke();
        context.beginPath();
        context.arc(8.5, 82.5, 2.5, 0, 2 * Math.PI);
        context.fillStyle = "#D8D8D8";
        context.fill();
        context.stroke();
      }
    }
  }, [])
  return(
      <canvas className={'canvas-wraper'} ref={(ref) => {
        canvasWraper = ref
      }} width={12} height={86}>
      </canvas>
  )
}

export default Brackets
