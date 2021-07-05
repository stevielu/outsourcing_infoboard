/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash'
import { Dropdown, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { DropMenu,DropMenuItems } from './DropMenu'
import { IconButton } from '../../libs/base/base-style'
import { setColumns } from '../../reducers/config/table'
import { tableConfig } from '../../selectors/config'

export const CustomizeTool = ({keys,tableName}:{keys:any;tableName:string}) => {
  const dispatch = useDispatch()
  const {columns} = useSelector(tableConfig)
  let current = columns[tableName]
  let newColumns = [{}]


  const checkHandle = (e:any) => {
    if(e.target.checked == false){/*remove*/

      newColumns = current.filter((item:any) => item.key != e.target.value)
      dispatch(setColumns(newColumns,tableName))
    }else{/*insert new*/
      const isEqual = (item:any) => item.key === e.target.value

      if(current.find(isEqual) == undefined){
        const insertIndex = keys.findIndex(isEqual)
        const insertValue = keys.find(isEqual)

        current.splice(insertIndex,0,insertValue)
        dispatch(setColumns(current,tableName))
      }
    }
  }

  const tableColumns = map(keys, item => {
    const {title, key} = item
    return (
      {
        displayName: title,
        key: key,
        icon:'',
        content:<Checkbox defaultChecked value={key} onChange={checkHandle}>{title}</Checkbox>,
      })
  }) as DropMenuItems

  const menu = (
      <DropMenu config={tableColumns}/>
  )

  return (
    <Dropdown overlay={menu}>
      <IconButton icon = {<EditOutlined />}>自定义列表</IconButton>
    </Dropdown>
  )

}
