import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const ToolBar = ({ createNode }) => {

  const onItemClicked = (name) =>{
    createNode(name);
  }

  return (
    <React.Fragment>
    <ListItemButton onClick={()=>{ onItemClicked("sign")}}>
      <ListItemIcon>
        <BorderColorIcon />
      </ListItemIcon>
      <ListItemText primary="Signature"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{ onItemClicked("text")}}>
      <ListItemIcon>
        <TextFieldsIcon />
      </ListItemIcon>
      <ListItemText primary="Text"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{ onItemClicked("date")}}>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Date"/>
    </ListItemButton>
   
  </React.Fragment>
   
  );
  
};

export default ToolBar;