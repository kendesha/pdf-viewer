import {React, Component} from "react";
import {
    Accordion,
    Box,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from "@material-ui/core";
  import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

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
        <Box className={this.classes.accordion}>
                <Accordion>
                <AccordionSummary>
                    <Typography>Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <input type="text" defaultValue={this.state.location.top}/>
                <input type="text" defaultValue={this.state.location.top}/>
                </AccordionDetails>
                </Accordion>
            </Box>
           
          </div>  
        )
      }

}

export default NodeOptions;