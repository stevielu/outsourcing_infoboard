/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import Logger from '../../utils/logger'
const Message = Logger('network')
export default class Effector{
  static onLoading(contents?:string){
    Message.loading(contents?contents:'Loading...')
  }

  static finished(contents?:string){
    if(contents){
      Message.successAlert(contents)
    }else{
      Message.hideLoading()
    }
  }

  static error(contents?:string){
    Message.errorAlert(contents?contents:'Fail')
  }

}
