/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

/*单字节双字节长度区分*/
export const lengthValidation = (content:string,scope:{min?:number;max?:number;}):boolean => {

  function strlen(str:string){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
     }
     else {
      len+=2;
     }
    }
    return len;
  }

  const currentLen = strlen(content)

  if(scope.min){
    if( scope.min > currentLen){
      return false
    }
  }

  if(scope.max){
    if( scope.max < currentLen){
      return false
    }
  }

  //校验成功
  return true
}
