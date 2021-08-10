/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useCallback,useState} from 'react';
import { jsPDF } from 'jspdf'
import domtoimage from 'dom-to-image';

export const usePrintPdf = ()=>{
  const [image,setImage] = useState('')

  const pdfGen = (imgWidth:number,imgHeight:number)=>{
    let orientation:'l'|'p' = 'p'
    if(imgHeight > imgWidth){
      orientation = 'p'
    }else{
      orientation = 'l'
    }
    const pdfDOC = new jsPDF(orientation, 'mm', 'a4'); //  use a4 for smaller page
    const width = pdfDOC.internal.pageSize.getWidth();
    const height = pdfDOC.internal.pageSize.getHeight();
    let widthRatio = width / imgWidth
    let heightRatio = height / imgHeight
    let ratio = widthRatio > heightRatio ? heightRatio : widthRatio

    return {file:pdfDOC,ratio:ratio,direction:orientation}
  }

  const print = useCallback((ref:HTMLElement) =>{
    const current = ref
    window.scrollTo(0,0)
    const divWidth = current.scrollWidth
    const divHeight = current.scrollHeight
    domtoimage.toPng(current,{width:divWidth,height:divHeight})
      .then(dataUrl => {
        const pdf = pdfGen(divWidth,divHeight)

        pdf.file.addImage(dataUrl, 'PNG', 0, 0, divWidth*pdf.ratio,  divHeight*pdf.ratio);
        pdf.file.save('summary.pdf');   //Download the rendered PDF.
        setImage(dataUrl)
      })
  },[])

  return {image,print}
}
