/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
class Formatter {
  namespace: string;
  constructor(namepsace: string) {
    this.namespace = namepsace;
  }

  timeStamp2String(time:string|number){
    let date = new Date(time)
    if(isNaN(date.getTime())){
      return '-'
    }
    let Y = date.getFullYear();
    let month:any = date.getMonth()+1;
    if(month<10){
      month ="0"+month;
    }
    let D:any = date.getDate();
    if(D<10){
      D ="0"+D;
    }
    let H:any = date.getHours(); //获取当前小时数(0-23)
    if(H<10){
      H ="0"+H;
    }
    let M:any = date.getMinutes(); //获取当前分钟数(0-59)
    if(M<10){
      M ="0"+M;
    }
    let S:any = date.getSeconds();
    if(S<10){
      S ="0"+S;
    }
    return `${Y}/${month}/${D} ${H}:${M}:${S}`
    // return date.toLocaleString('zh', { hour12: false })
  }

  ipFormater(section1:string,section2:string,section3:string,section4:string):string{
    return section1 + '.' + section2 + '.' + section3 + '.' + section4
  }
}

export default (namespace: string) => new Formatter(namespace);
