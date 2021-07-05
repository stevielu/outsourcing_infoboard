import React,{FunctionComponent,useState} from 'react'
import {Input,Form} from 'antd'
import {InputProps} from 'antd/lib/input'
import {ValidateStatus} from 'antd/lib/form/FormItem'
import { FormSelectMenu,SelectProps } from './Select';
import FormValidator from '../../utils/validator'

interface FormProps{
  isRequired?:boolean;
  isDisabled?:boolean;
  val?:any;
}

interface InputItemProps extends FormProps,InputProps{
  itemName:string;
  itemLabel:string;
  desc?:string;
  showHelpWords?:boolean;
}

interface FormSelectProps extends InputItemProps,FormProps{

}

const DisabledInput:FunctionComponent<InputItemProps> = (props)=>{
  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    help={props.desc}
    initialValue={props.val}
    >
      <Input disabled />

    </Form.Item>
  )
}

const InputEng0430:FunctionComponent<InputItemProps> = (props) => {
  const lengthValidator = (_:any,value:any,callback:any) => {
    const result = FormValidator.lengthValidation(value,{min:4,max:30})
    return result === true ? Promise.resolve() : Promise.reject('内容长度最大为30，最小为4')
  }

  return (
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    help={props.showHelpWords === true ? "只支持英文和数字，长度4-30":undefined}
    initialValue={props.val}
    extra = {'英文和数字，长度4-30'}
    rules={[
            { required: props.isRequired, message: `请输入${props.itemName}`},
            { validator: lengthValidator },
            { pattern: new RegExp(/^[0-9a-zA-Z]{1,}$/, "g") , message: '请输入英文或者数字' }
          ]}

    >
      <Input/>
    </Form.Item>
  )
}

const Input0430:FunctionComponent<InputItemProps> = (props) => {
  const lengthValidator = (_:any,value:any,callback:any) => {
    const result = FormValidator.lengthValidation(value,{min:4,max:30})
    return result === true ? Promise.resolve() : Promise.reject('内容长度最大为30，最小为4，中文占两个字符')
  }

  return (
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    help={props.showHelpWords === true ? "支持英文，数字，和特殊字符-_,长度4-30":undefined}
    initialValue={props.val}
    rules={[
            { required: props.isRequired, message: `请输入${props.itemName}`},
            { validator: lengthValidator },
            { pattern: new RegExp(/^[0-9a-zA-Z\u4e00-\u9fa5_-]{1,}$/, "g") , message: '支持英文，数字，和特殊字符-_,长度4-30' }
          ]}

    >
      <Input/>
    </Form.Item>
  )
}

const Input0464:FunctionComponent<InputItemProps> = (props) => {
  const lengthValidator = (_:any,value:any,callback:any) => {
    const result = FormValidator.lengthValidation(value,{min:4,max:64})
    return result === true ? Promise.resolve() : Promise.reject('内容长度最大为64，最小为4，中文占两个字符')
  }
  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    help={props.showHelpWords === true ? "支持中英文，数字，和特殊字符-_,长度4-64":undefined}
    initialValue={props.val}
    rules={[
            { required: props.isRequired, message: `请输入${props.itemName}` },
            { validator: lengthValidator },
            { pattern: new RegExp(/^[0-9a-zA-Z\u4e00-\u9fa5_-]{1,}$/, "g") , message: '支持中英文，数字，和特殊字符-_,长度4-64' }
          ]}

    >
      <Input/>
    </Form.Item>
  )
}

const InputDesc500:FunctionComponent<InputItemProps> = (props) => {
  const lengthValidator = (_:any,value:any,callback:any) => {
    const result = FormValidator.lengthValidation(value,{min:0,max:500})
    return result === true ? Promise.resolve() : Promise.reject('内容长度最大为500，中文占两个字符')
  }
  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    initialValue={props.val}
    rules={[
      { validator: lengthValidator },
      { required: props.isRequired, message: `请输入${props.itemName}` }
    ]}>
      <Input.TextArea rows={2} />
    </Form.Item>
  )
}

const InputDesc100:FunctionComponent<InputItemProps>  = (props) => {
  const lengthValidator = (_:any,value:any,callback:any) => {
    const result = FormValidator.lengthValidation(value,{max:100})
    return result === true ? Promise.resolve() : Promise.reject('内容长度最大为100，中文占两个字符')
  }
  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    rules={[{ validator: lengthValidator }]}
    initialValue={props.val}
    >
      <Input.TextArea rows={2}/>
    </Form.Item>
  )
}


const LocationInput:FunctionComponent<InputItemProps>  = (props) => {
  const [validateStatus,setValidateStatus] = useState<ValidateStatus>("")
  const locationValidator = (_:any,value:any,callback:any) => {
    if(FormValidator.isEmpty(value) === true){
         setValidateStatus('error')
         return Promise.reject('不可以为空')
    }

    if(FormValidator.lnglatValidator(value) === false){
        setValidateStatus('error')
        return Promise.reject('坐标不合法')
    }

    setValidateStatus('success')
    return Promise.resolve()
  }

  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    help="精确到小数点后6位"
    rules={[
            { validator: locationValidator }
          ]}
    hasFeedback
    validateStatus={validateStatus}
    initialValue = {props.val}
    >
      <Input {...props}/>
    </Form.Item>
  )
}

interface FormSelectProps extends InputItemProps,SelectProps{
  isRequired?:boolean;
}

const InputDropSelect:FunctionComponent<FormSelectProps>  = (props) => {
  return(
    <Form.Item
    name={props.itemName}
    label={props.itemLabel}
    rules={[
            { required: props.isRequired, message: `请选择${props.itemName}` }
          ]}
    >
      <FormSelectMenu config = {props.config} />
    </Form.Item>
  )
}

export {
  InputEng0430,
  Input0430,
  Input0464,
  InputDesc500,
  InputDesc100,
  InputDropSelect,
  LocationInput,
  DisabledInput,
}
