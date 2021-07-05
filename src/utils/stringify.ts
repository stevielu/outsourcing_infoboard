import { renderToString,renderToStaticMarkup } from 'react-dom/server'
import {hydrate} from 'react-dom'
import { map } from 'lodash'
class Stringify {

  static JSXToString(content:JSX.Element){
    return renderToString(content)
  }

  static JSXToStaticMarkup(content:JSX.Element){
    return renderToStaticMarkup(content)
  }

  static hydrate(content:JSX.Element,id:string){
    return hydrate(content,document.getElementById(id))
  }

  static NewLine(content:string,render:(str:string)=>JSX.Element){
    const newVal = content.split('/n')
    return map(newVal,item => {
      console.log(item)
      return render(item)
    })

  }

}

export default Stringify;
