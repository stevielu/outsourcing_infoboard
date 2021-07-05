import React,{forwardRef} from 'react'
import Icon from '@ant-design/icons'
import iconSettingsUrl from '../../assets/icon-settings.png'
import iconDevicesUrl from '../../assets/icon-devices.png'
import iconAddUrl from '../../assets/icon-add.png'

const GroupSvg = () => {
    return <svg height="15" width="13">
        <path d="M0,0 L0,15 L13,15 L13,0 Z" fill="#f2c04b"/>
        <path d="M13,0 L13,6 L7,0 Z" fill="#f9e35b" />
        <path d="M7,0 L7,6 L13,6 Z " fill="#e98b34"/>
    </svg>
}

const ProdtypeSvg = () => {
    return <svg height="15" width="13">
        <path d="M0,0 L0,15 L13,15 L13,0 Z" fill="#fbe183" />
        <path d="M7,0 L7,6 L13,6 Z" fill="#ffb774"/>
    </svg>
}

export const SettingsIcon = forwardRef((props?:any,ref?:any) => <Icon style={{verticalAlign:'middle',position:'relative',top:'-2px'}} component={()=><img src={iconSettingsUrl} alt='settings'/>} {...props}/>)

export const GroupIcon = (props?:any) => <Icon component={GroupSvg} {...props}/>

export const ProdtypeIcon = (props?:any) => <Icon component={ProdtypeSvg} {...props}/>

export const DeviceIcon = (props?:any) => <Icon style={{verticalAlign:'middle',position:'relative',top:'-2px'}}  component={()=><img style={{height:'14px'}} src={iconDevicesUrl} alt='devices'/>} {...props}/>

export const AddIcon = (props?:any) => <Icon className="icon-add" component={()=><img src={iconAddUrl} alt="add"/>} {...props}/>
