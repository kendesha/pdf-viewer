import {useState,useEffect,useRef } from "react";
import {Container, Row, Col} from "react-grid";
import ToolBar from './toolbar';
import DocumentCanvas from './documentcanvas';
import NodeOptions from "./nodeoptions";


export default function ViewDocument(props) {
  
  const[nodes, setNodes] = useState([]);
  const [boundaries, setBoundaries] = useState({top:0, right: 0, bottom: 0, left: 0})
  const [focusedNode,setFocusedNode] = useState(null);
  const boundsRight = boundaries.right;
  const boundsLeft = boundaries.left;
  
  function findArrayElementByTitle(array, id) {
    return array.find((element) => {
      return element.id === id;
    })
  }
  const handleOnFocus = (id) =>{
     // console.log(node,node.id);
      const _currentNode = findArrayElementByTitle(nodes,id);
      setFocusedNode(_currentNode);
  }

  const updateBoundary = ({top, bottom, left, right}) => {

    console.log("updating boundaries")
    console.log(top, bottom, left, right)
      setBoundaries(() => {
        return {top, bottom, left, right}
      })
  }

  const updateDragNode = (node) =>{
    console.log("update drag");
    console.log(node)

    var checkOffSet = document.getElementById('1');
    console.log("checking off set:" ,checkOffSet.offsetLeft, checkOffSet.offsetTop );
    const {index, x, y, width} = node;

    if (x < 0 || y < 0){
       return;
    }

    console.log("node width is ", width)
    console.log("max right is ", (boundsRight - boundsLeft - width))


    console.log("x is ", x)
    if (x > 600) {
      return;
    }

    // console.log("node index", index);
    // console.log("node x", x);
    // console.log("node y", y);

    const draggeNodeIndex = nodes.findIndex(node => node.id == index)

    setNodes((nodes) => {
      return  [
        ...nodes.slice(0, draggeNodeIndex), 
        {... nodes[draggeNodeIndex], x:x, y:y},
        ...nodes.slice(draggeNodeIndex + 1)
      ]
    });

  }

  const removeNode = (node) =>{
    const newNodes= nodes.filter((t) => t !== node)
    setNodes(newNodes);
  }

  const createNode = (item) => {
    switch(item){
        case "":
            return null;
        case "text":
        { 
         
            setNodes((nodes) => {
              return [
                ...nodes, {
                      id:  nodes.length + 1,
                      type: 'text',
                      x: boundaries.top,
                      y: 100,
                      width: 100,
                      height: 100
                  }]
            })
            
        }
    }
}
    return (
      <div>
      <Container>
      <Row>
        <Col xs={2}>
          <ToolBar createNode={(item)=> createNode(item)}/>
        </Col>
        <Col xs={8}>
          <DocumentCanvas nodes={nodes} updateDragNode = {(coordinates) => updateDragNode((coordinates))}  removeNode={(item) => removeNode(item)} updateBoundary = {updateBoundary} handleOnFocus= {handleOnFocus}/>
        </Col>
        <Col xs={2}>
          <NodeOptions focusedNode={focusedNode}/>
        </Col>
      </Row>
    </Container>
   
    
      </div>
    
    );
  }
  