import {useState,useEffect,useRef } from "react";
import {Rnd} from "react-rnd";
export default function DocumentCanvas({nodes,updateDragNode, updateBoundary,handleOnFocus} ) {
   
    const [canvasSize,setCanvasSize] = useState({width: '', height:''});
    const [clientSize,setClientSize] = useState({top: 0, bottom:0, left: 0, right: 0});

    const {top, bottom, left, right} = clientSize;
    
    const canvasRef = useRef(null);
    
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
    }, [top, bottom, left, right])





    useEffect(() => {
      (async function () {
        // We import this here so that it's only loaded during client-side rendering.
        const pdfJS = await import('pdfjs-dist/build/pdf');
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
        var loadingTask = pdfJS.getDocument(url);
        loadingTask.promise.then(function(pdf){
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page){
                //actual page size for re-rendering 
                console.log(page.view)
                
                const viewport = page.getViewport({ scale: 1.5 });
          
                // Prepare canvas using PDF page dimensions.
                const canvas = canvasRef.current;
        
                console.log("inner top", canvas.getBoundingClientRect().top)
                console.log("inner bottom", canvas.getBoundingClientRect().bottom)
                console.log("inner left", canvas.getBoundingClientRect().left)
                console.log("inner right", canvas.getBoundingClientRect().right)
                console.log("inner height", canvas.clientHeight)
                console.log("inner width", canvas.clientWidth)
        
                setClientSize(() => {
                    return {
                          top: canvas.getBoundingClientRect().top,  
                          bottom: canvas.getBoundingClientRect().bottom, 
                          left: canvas.getBoundingClientRect().left, 
                          right: canvas.getBoundingClientRect().right }
                })
             
                const canvasContext = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                setCanvasSize(prev =>({
                                    ...prev, 
                                    width: canvas.width, 
                                    height:canvas.height}));
                console.log("canvas size:" ,canvasSize);
           
                // Render PDF page into canvas context.
                const renderContext = { canvasContext, viewport };
                page.render(renderContext);
            });
        });
       
      })();
    }, []);
 
    return (
        <>
               <canvas ref={canvasRef} style={{ height: '100vh' }} />
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
  