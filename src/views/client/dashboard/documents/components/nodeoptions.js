import {React, Component} from "react";
import {Box} from "@material-ui/core";
import InputGroup from 'react-bootstrap/InputGroup';
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {Grid} from '@mui/material';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
class NodeOptions extends Component{
    constructor(props) {
        super();
       console.log("node options current node:",props.focusedNode);
        this.state = {
            type: props?.focusedNode?.type,
            location: {
                top: props?.focusedNode?.y,
                left: props?.focusedNode?.x
            }
        };
      }
       classes = makeStyles({
        accordion: {
          margin: 3,
          width: 100,
        },

      });
      render(){
        return (
          <div>
        <Box>
        <Card style={{ width: '18rem', background: 'white',padding: '20px' }}>
                    <Card.Body>
                      <Card.Title>Signer</Card.Title>
                       <Card.Text>
                       <Form.Select aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        
                      </Card.Text>
                     </Card.Body>
          </Card>
         <Card style={{ width: '18rem', background: 'white',padding: '20px' }}>
                    <Card.Body>
                      <Card.Title>Location</Card.Title>
                       <Card.Text>
                       <Grid container spacing={2}>
                        <Grid item xs={12} >
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">x</InputGroup.Text>
                        <Form.Control
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                        </Grid>
                        <Grid item xs={12} >
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">y</InputGroup.Text>
                        <Form.Control
                           aria-describedby="basic-addon2"
                        />
                      </InputGroup> 
                        </Grid>
                      </Grid>
                      </Card.Text>
                     </Card.Body>
          </Card>
    
          </Box>
           
          </div>  
        )
      }

}

export default NodeOptions;