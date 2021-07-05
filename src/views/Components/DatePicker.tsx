/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React, {FunctionComponent, useState, useEffect} from 'react'
import { DatePicker }  from 'antd';
import moment,{Moment} from 'moment';
import styled from "styled-components";
import {Container} from "../../libs/base/base-style";

const { RangePicker } = DatePicker;
type DatePickerProps = {
  date?:any,
  dateDefault?:any,
  onUpdated?:(date:any)=>void,
  onFocused?:(yearMonth:any)=>void
}
const LightDate = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 8px solid limegreen;
  border-right: 8px solid transparent;
`
const App:FunctionComponent<DatePickerProps> = (props) => {
  const [dates, setDates] = useState<any>();
  const [value, setValue] = useState<any>();
  const [hackValue, setHackValue] = useState<any>();

  const disabledDate = (current:Moment) => {
    if (!dates || dates.length === 0) {
      return  current && current > moment().endOf('day');
    }

    const tooLate = dates[0] && current.diff(dates[0], 'hours') > 1;
    const tooEarly = dates[1] && dates[1].diff(current, 'hours') > 1;
    return tooEarly || tooLate
  };

  const range = (start:number, end:number) =>{
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const fullTime = {
    disabledHours: () => range(0, 24).splice(24, 1),
    disabledMinutes: () => range(0, 61).splice(61, 1),
  };
  function disabledRangeTime(date:any, type:string) {
    const current = date as Moment

    if (type === 'start') {
      if(dates && dates[1] && current){
        const end = dates[1] as Moment
        const exHour = range(0,24).filter(item => item !== end.hour()).filter(item => item !== end.hour()-1)
        const exMin = range(end.minute(),60)
        return {
          disabledHours: () => exHour,
          disabledMinutes: () => exMin,
        }
      }
      return fullTime
    }
    //end
    if(dates && dates[0] && current){
      const time = dates[0] as Moment
      const exHour = range(0,24).filter(item => item !== time.hour()).filter(item => item !== time.hour()+1)
      const exMin = current.hour() === time.hour() ? range(0,time.minute()+1):range(time.minute(),60)
      return {
        disabledHours: () => exHour,
        disabledMinutes: () => exMin,
      }
    }
    else{
      return fullTime
    }
  }
  useEffect(()=>{
    if(props.dateDefault&&props.dateDefault[0]){
      setValue([moment(props.dateDefault[0]),moment(props.dateDefault[1])])
    }

  },[props.dateDefault])

  return (
      <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          value={hackValue || value}
          disabledDate={disabledDate}
          disabledTime={disabledRangeTime}
          dateRender={current => {
            return (
                <div className="ant-picker-cell-inner">
                  <div>{current.date()}</div>
                  {props.date.indexOf(current.format('YYYY-MM-DD'))!==-1&&<LightDate></LightDate>}
                </div>
            )
          }}
          onFocus={()=> {
            if(props.onFocused){
              props.onFocused('')
            }
          }
          }
          onChange = {val => {
            console.log(val)
            setValue(val)
            if(props.onUpdated){
              props.onUpdated(val)
            }
          }}
          onPanelChange= {(value, mode) => {
            if(props.onFocused){
              if(value&&value[0]){
                let month:number|string = value[0].month();
                if((month+1)<10){
                  month ="0"+(month+1);
                }
                props.onFocused(value[0].year()+'-'+month)
              }
            }
          }}
          onCalendarChange={val => {
            setDates(val)

          }}
          {...props}
      />
  );
};
export default App
