import React from 'react'
import {Popover} from 'antd'
import styled from 'styled-components'
import {map} from 'lodash'
import {SettingsIcon} from './CustomIcon'
const StyledPopover = styled(Popover)`
    
`

const Itemp = styled.p`
    cursor:pointer;
`
export type MenuItem = {
    id:string
    title:string;
    handle:(e:any)=>void;
}
export const CustomPopover = ({config}:{config:MenuItem[]}) => {
    const content = (
        <div>
            {
                config && config.length> 0 && map(config,(item,index)=>{
                    return <Itemp key={item.id+index} onClick={item.handle}>{item.title}</Itemp>
                })
            }
        </div>
    )
    return <StyledPopover content={content} placement="bottomRight">
        <SettingsIcon/>
    </StyledPopover>
}