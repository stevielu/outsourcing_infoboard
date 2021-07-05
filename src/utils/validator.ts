class FormValidator{
  /*单字节双字节长度区分*/
  static lengthValidation(content:string|number,scope:{min?:number;max?:number;}):boolean{
    let strContent = ''
    let currentLen = 0

    if(content as number){
      strContent = content.toString()
    }else{
      strContent = content as string
    }

    function strlen(str:string){
      if(!str){
        console.log('Validation fail: Invalid string length')
        return -1
      }
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


    currentLen = strlen(strContent)



    if(scope.min){
      if( scope.min >= currentLen){
        return false
      }
    }

    if(scope.max){
      if( scope.max <= currentLen){
        return false
      }
    }

    //校验成功
    return true
  }

  static lnglatValidator(lntlat:number){
    const regexp = new RegExp(`^((\\-?|\\+?)?\\d+(\\.\\d+)?)$`)
    return regexp.test(lntlat.toString())
  }

  static isEmpty(str:string) {
    return (!str || 0 === str.length);
}
}

export default FormValidator
