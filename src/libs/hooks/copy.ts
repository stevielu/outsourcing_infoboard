/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import ClipboardTools from '../../utils/clipboard'
/*工具*/
const tools = ClipboardTools()

export const useCopy = (item:string) =>{
  tools.copy(item)
}
