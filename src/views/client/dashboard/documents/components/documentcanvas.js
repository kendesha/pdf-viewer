import {useState,useEffect,useRef } from "react";
import {Rnd} from "react-rnd";
import ReactDOM from 'react-dom';
import userPDF from "./Desha API.pdf";

export default function DocumentCanvas({nodes,updateDragNode, updateBoundary,handleOnFocus} ) {
   
    const [canvasSize,setCanvasSize] = useState({width: '', height:''});
    const [clientSize,setClientSize] = useState({top: 0, bottom:0, left: 0, right: 0});
    var thePDF = null;
    var scale = 1;
    
   
    const {top, bottom, left, right} = clientSize;
    
    const divRef = useRef(null);
    
    const updateDrag = (coordinates) => {
         updateDragNode(coordinates);
    }

    const validateDrag = (data) => {
       console.log(data)
    }
    const focus =(node) =>{
        handleOnFocus(node);
    }
   
    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("getCursorPosition:", "x: " + x + " y: " + y)
    }
    useEffect(() => {
       updateBoundary({top, bottom, left, right })
    }, [top, bottom, left, right]);

    useEffect(() => {
        (async function () {
          // We import this here so that it's only loaded during client-side rendering.
          const pdfJS = await import('pdfjs-dist/build/pdf');

          const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
          
         
          pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
          var loadingTask = pdfJS.getDocument(userPDF);
            
          loadingTask.promise.then(function(pdf){
              thePDF = pdf;
              var viewer = document.getElementById('pdf-viewer');

              for(let page = 1; page <= pdf.numPages; page++) {
                var canvas = document.createElement("canvas");    
                canvas.className = 'pdf-page-canvas';         
                viewer.appendChild(canvas);            
                renderPage(page, canvas);
              }
  
          });
         

        })();
    
    },[]);
         
    function renderPage(pageNumber, canvas) {
        thePDF.getPage(pageNumber).then(function(page) {
          var outputScale = window.devicePixelRatio || 1;
          var viewport = page.getViewport({ scale: outputScale });
         
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + "px";
          canvas.style.height =  Math.floor(viewport.height) + "px";   

          var transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;     
          
       page.render({canvasContext: canvas.getContext('2d'),  transform: transform, viewport: viewport});
        
    })};  

       
    return (
        <>
               <div ref={divRef} style={{ height: '100vh',overflowY:"auto" }} id="pdf-viewer"/>
                

                { nodes.map((node,index) =>{
                  
                    switch(node.type){
                        case "": 
                            return null;
                        case "text":
                        { 
                            return(
                                <Rnd
                                    key={node.id}
                                    position={{x: node.x, y: node.y}}
                                    onDragStop={(e,d) =>{updateDrag({x: d.x, y: d.y,index:node.id, width: node.width})}}
                                    onDrag= {validateDrag}
                                >
                                    <input type="text" id={node.id} autoComplete="off" className="nodes" onClick={()=>{focus(node.id)}}></input>
                                </Rnd>
                            )
                            
                        }
                    }
                    })
                }
        </>
     
    
    );
  }
  