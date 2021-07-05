/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {MockApi} from './modules'
let roleArr = {
  endRow: 3,
  hasNextPage: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  list: [
    {
      createTime: 1609385799000,
      creator: "admin",
      id: "2a8b828f0e2648299fed9d7c3192b823",
      userType: 2,
      modifier: "admin",
      modifyTime: 1609395701000,
      roleName: "超级管理员",
      roleId: "SAdmin",
    },
    {
      createTime: 1609385799000,
      creator: "admin",
      id: "2a8b828f0e2648299fed9d7c3192b8c3",
      userType: 1,
      modifier: "admin",
      lastModifier: "admin",
      modifyTime: 1609395701000,
      lastModifyTime: 1609395701000,
      roleName: "管理员",
      roleId: "Admin",
    },
    {
      createTime: 1609385799000,
      creator: "admin",
      id: "2a8b828f0e2648299fed9d7c3192b1c3",
      userType: 0,
      modifier: "admin",
      lastModifier: "admin",
      modifyTime: 1609395701000,
      lastModifyTime: 1609395701000,
      roleName: "业务用户",
      roleId: "Bussiness",
    },{
      createTime: 1609385799000,
      creator: "admin",
      id: "2a8b828f0e2648299fed9d7c3192b2c3",
      userType: 0,
      modifier: "admin",
      lastModifier: "admin",
      modifyTime: 1609395701000,
      lastModifyTime: 1609395701000,
      roleName: "产品管理用户",
      roleId: "ProductM",
    }
  ],
  navigateFirstPage: 1,
  navigateLastPage: 1,
  navigatePages: 8,
  navigatepageNums: [1],
  nextPage: 0,
  pageNum: 1,
  pageSize: 20,
  pages: 1,
  prePage: 0,
  size: 3,
  startRow: 1,
  total: 3,
}
let roleInfo = {
  '2a8b828f0e2648299fed9d7c3192b823':{
    createTime: 1609385799000,
    creator: "admin",
    id: "2a8b828f0e2648299fed9d7c3192b823",
    userType: 2,
    modifier: "admin",
    modifyTime: 1609395701000,
    roleName: "超级管理员",
    roleId: "SAdmin",
    lastModifier: "admin",
    lastModifyTime: 1609395701000,
  },
  "2a8b828f0e2648299fed9d7c3192b8c3":{
    createTime: 1609385799000,
    creator: "admin",
    id: "2a8b828f0e2648299fed9d7c3192b8c3",
    userType: 1,
    modifier: "admin",
    modifyTime: 1609395701000,
    roleName: "管理员",
    roleId: "Admin",
    lastModifier: "admin",
    lastModifyTime: 1609395701000,
  },
  "2a8b828f0e2648299fed9d7c3192b1c3":{
    createTime: 1609385799000,
    creator: "admin",
    id: "2a8b828f0e2648299fed9d7c3192b1c3",
    userType: 0,
    modifier: "admin",
    modifyTime: 1609395701000,
    roleName: "业务用户",
    roleId: "Bussiness",
    lastModifier: "admin",
    lastModifyTime: 1609395701000,
  },
  '2a8b828f0e2648299fed9d7c3192b2c3':{
    createTime: 1609385799000,
    creator: "admin",
    id: "2a8b828f0e2648299fed9d7c3192b2c3",
    userType: 0,
    modifier: "admin",
    modifyTime: 1609395701000,
    roleName: "产品管理用户",
    roleId: "ProductM",
    lastModifier: "admin",
    lastModifyTime: 1609395701000,
  }
}
interface ObjWithId{
  id:string;
}

const deleteItem = <T extends ObjWithId>(id:string,arr:Array<T>)=>{
  return arr.filter(item => item.id !== id)
}

const updateItem = (id:string,arr:Object,value:any)=>{
  arr[id] = value
}

const AuthModule: Array<MockApi> = [
  /**
   * @api {post} /user 登陆
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {String} username          用户ID
   * @apiParam {String} passowrd          用户密码
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 200,
   *       data: {}
   *     }
   */
  {
    url: '/login',
    type: 'post',
    data: {
      code: 200,
      msg: 'test',
      data:(req:any, res:any)=>{
        return {
          code: 200,
          message: true
        }
      }
    }
  },
  /**
   * @api {post} /role 角色列表
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 200,
   *       data: {}
   *     }
   */
  {
    url: '/role/find',
    type: 'post',
    data: {
      code: 200,
      msg: 'success',
      data:(req:any, res:any)=>{
        return roleArr
      }
    }
  },
  /**
   * @api {post} /role 角色详情
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {String} roleId          用户ID
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 200,
   *       data: {}
   *     }
   */
  {
    url: '/role/findById',
    type: 'post',
    data: function(req:any, res:any){
      return{
        code: 200,
        msg: 'success',
        data:roleInfo[req.body.id]
      }

    }
  },
  /**
   * @api {post} /role 角色删除
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {String} roleId          用户ID
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 200,
   *       data: {}
   *     }
   */
  {
    url: '/role/delById',
    type: 'post',
    data: function(req:any, res:any){
      console.log(req.body)
      roleArr.list = deleteItem(req.body.id,roleArr.list)
      return{
        code: 200,
        msg: 'success',
      }

    }
  },
  /**
   * @api {post} /role 角色更新
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {String} roleId          用户ID
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 200,
   *       data: {}
   *     }
   */
  {
    url: '/role/updateById',
    type: 'post',
    data: function(req:any, res:any){
      console.log(req.body)
      updateItem(req.body.id,roleInfo,req.body)
      return{
        code: 200,
        msg: 'success',
      }

    }
  },
]

export default AuthModule
