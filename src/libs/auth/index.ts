/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { useSelector, useDispatch } from 'react-redux';
import {setStatus} from './store'
/*

Parameter @Value 输入框初始值
Return @handle 返回给触发事件对象的回调，如目标Click处理；item为待解锁的Input对象 @setUnlock 手动解锁输入框disable 属性
*/
export default class Auth
{
    private static _instance: Auth;
    private  _url:string = '';
    private _authFail?:() => void;
    private _authSuccess?:() => void;
    get url()
    {
      return this._url
    }

    set url(value:string)
    {
      this._url = value
    }


    get isAuthenticated()
    {
      const isAuthenticated = useSelector((state:any)=>{
        return state['auth']
      })
      return isAuthenticated
    }
    constructor()
    {
    }

    public static Instance(): Auth {
        if (!Auth._instance) {
            Auth._instance = new Auth();
        }
        return Auth._instance;
    }

    public login = () => {
      if(this._authSuccess){
        this._authSuccess()
      }
    }

    public logout = () => {
      localStorage.clear()
      if(this._authFail){
        this._authFail()
      }
    }

    public onRedirect = (callback:()=>void) => {
      this._authFail = callback
    }

    public onLoginSuccess = (callback:()=>void) => {
      this._authSuccess = callback
    }
}
