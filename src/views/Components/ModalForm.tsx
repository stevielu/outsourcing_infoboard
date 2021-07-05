import React,{FunctionComponent,useImperativeHandle} from 'react'
import * as FormItem from './Form'
import {Form} from 'antd'
import { SelectType } from './Select';





type TextFormProps = {
  cRef?:any;
  formName:string;
  itemName:string;
  itemLabel:string;
  itemRule:{
    lengthType:'short'|'long';
    inputType:'input'|'textArea'|'select';
    required:boolean;
  }
  selectConfig?:SelectType[];
  updateValue?:(value:string)=>void;//回调
}

const TextForm:FunctionComponent<TextFormProps> = (props) => {
  const [form] = Form.useForm()

  useImperativeHandle(props.cRef, () => ({
    form:form,
  }));

  const formValueHandle = (changed:any,value:any) =>{
    const text = form.getFieldValue(props.itemName)
    console.log(text)
    if(props.updateValue){
      props.updateValue(text)
    }
  }

  const switchRender = ()=>{
    switch (props.itemRule.inputType) {
      case 'input':
          return <FormItem.Input0430 itemName ={props.itemName} itemLabel = {props.itemLabel} {...props.itemRule.required}/>
      case 'textArea':
          return <FormItem.InputDesc500 itemName ={props.itemName} itemLabel = {props.itemLabel} {...props.itemRule.required}/>
      case 'select':
          return <FormItem.InputDropSelect itemName ={props.itemName} itemLabel = {props.itemLabel} config = {props.selectConfig} {...props.itemRule.required}/>
    }
  }

  return (
    <Form form={form} onValuesChange={formValueHandle} layout="vertical" name={props.formName}>
        {switchRender()}
    </Form>
  )
}

export default TextForm
