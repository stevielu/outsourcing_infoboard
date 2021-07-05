/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import NetworkApi from '../libs/network/d'
import {weatherCode} from '../assets/weather'
import React from 'react'
/*天气图标*/

/*高德天气Api*/
interface CurrentWeather  {
  province:string;
  city:string;
  adcode:string;
  weather:string;
  temperature:string;
  winddirection:string;
  windpower:string;
  humidity:string;
  reporttime:string;
}
interface WeatherModel {
  status:string,
  count:string,
  info:string,
  infocode:string,
  lives:CurrentWeather[]
}
type WeatherParam = {
  city:string;
  key:string;
}

type WeatherResult = {
  current:string;
  image:JSX.Element;
  temperature:string;
}
class WeatherNetwork{
  private network:NetworkApi

  constructor(network:NetworkApi){
    this.network = network

  }

  getGaodeWeather = (params:WeatherParam) =>{
    const res = this.network.get<any>('https://restapi.amap.com/v3/weather/weatherInfo',params).then(val => {
      if(val.status == '10000' && val.lives.length > 0){//
        const result = val.lives[0]
        const icon = <img width = {20} height = {17} src= {  weatherCode[result.weather]}/>
        return {
          current:result.weather,
          image:icon,
          temperature:result.temperature
        } as WeatherResult
      }
    })
    return res
  }

}

export default (network: NetworkApi) => new WeatherNetwork(network);
