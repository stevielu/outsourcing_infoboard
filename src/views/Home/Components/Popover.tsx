import React,{FunctionComponent} from 'react';
import styled from 'styled-components'
import { Popover,Checkbox,Row, Col  } from 'antd';
import { Container,ContentFont } from '../../../libs/base/base-style'


export type ProcedureProps = {
  data:{
    title:string;
    id:number;
    selected:boolean;
  }[],
  onChange:(e:any)=>void;
}

// const Box = styled(Container)`
//   width:97.87px;
//   height:62px;
//   border-radius:3px;
//   margin-right:6px;
//   margin-top:6px;
//   flex:1;
//   display: flex;
//   padding: 5px;
// `


// const Content = styled(ContentFont)`
//   display: -webkit-box;
//   max-width: 200px;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// `
// const TitleBox = styled(Container)`
//   display:flex;
//   flex-direction:column;
// `
const Tally = styled(ContentFont)`
  margin-left:auto;
`
// const Header:FunctionComponent<{cnt:number,total:number,onChange:(e:any)=>void> = (props) => {
//
//   const onClick = React.useCallback((e:any)=>{
//     // props.onChange(e)
//     // setIndeterminate(false);
//     // setCheckAll(e.target.checked);
//   },[])
//   return (
//     <Container>
//       <Checkbox indeterminate={indeterminate} onChange={onClick} checked={checkAll}/>
//       <ContentFont>全部</ContentFont>
//       <Tally>{`${props.cnt}/${props.total}`}</Tally>
//     </Container>
//   )
// }
//

// const Body:FunctionComponent<{data:Array<string>,onChange:(e:any)=>void}> = (props) => {
//   const [checkedList, setCheckedList] = React.useState(props.data);
//   return (
//     <CheckboxGroup options={props.data} value={checkedList} onChange={props.onChange} />
//   )
// }
const CheckboxGroup = Checkbox.Group;
const App:FunctionComponent<ProcedureProps> = (props) => {
  const [checkedList, setCheckedList] = React.useState(props.data.filter(item => item.selected === true).map(item => item.title));
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const onClick = React.useCallback((e:any)=>{
    setCheckedList(e.target.checked ? props.data.map(item => item.title) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    props.onChange(e)
  },[])
  const onChange = (list:any) => {
    console.log(list)
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < props.data.length);
    setCheckAll(list.length === props.data.length);
    props.onChange(list)

  };

  return(
    <Popover
      placement="rightTop"
      title={
        <Container>
          <Checkbox indeterminate={indeterminate} onChange={onClick} checked={checkAll}/>
          <ContentFont>全部</ContentFont>
          <Tally>{`0/${props.data.length}`}</Tally>
        </Container>
      }
    content={
      <CheckboxGroup options={props.data.map(item => item.title)} value={checkedList} >
        <Row>
          {props.data.map(item=>{
            return (
              <Col span={24}>
                <Checkbox  onChange={onChange} key = {item.id} value={item.id}>{item.title}</Checkbox>
              </Col>
            )
          })}

        </Row>
      </CheckboxGroup>
    }
    trigger="click">
      {props.children}
    </Popover>
  )
}
export default App
