/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { useSelector, useDispatch } from 'react-redux';
import {setStatus} from './store'
import {AppState} from '../../reducers'

export default class Auth
{
    private static _instance: Auth;
    private  _url:string = '';
    private _authFail?:() => void;
    private _authSuccess?:() => void;
    private _dispatch:ReturnType<typeof useDispatch> = useDispatch()

    constructor(){

    }

    set dispatch(value:ReturnType<typeof useDispatch>)
    {
      this._dispatch = value
    }

    get dispatch(){
      return this._dispatch
    }

    get url()
    {
      return this._url
    }

    set url(value:string)
    {
      this._url = value
    }

    setCookie(name:string, value:string, day?:number) {
     if (day) { // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
       var expires = day * 24 * 60 * 60 * 1000
       var date = new Date(+new Date() + expires)
       document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()}`
     } else {
       document.cookie = `${name}=${escape(value)};`
     }
   }
   getCookie(name:string) { // 获取cookies
       let strCookie = document.cookie
       let arrCookie = strCookie.split('; ')
       for (var i = 0; i < arrCookie.length; i++) {
         let arr = arrCookie[i].split('=')
         if (name == arr[0]) {
           return arr[1]
         }
       }
       return ''
   }


    get isAuthenticated()
    {
      //const authed = useSelector((state:AppState) => state.auth.isAuthenticated)
      const cookieAuth = this.getCookie('status') === 'true'
      return cookieAuth
    }

    set isAuthenticated(value:boolean){
      this.setCookie('status',`${value}`)
      this._dispatch(setStatus(value))
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
