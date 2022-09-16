import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
const ToolBar = ({ createNode }) => {

  const onItemClicked = (name) =>{
    createNode(name);
  }

  return (
    <React.Fragment>
    <ListItemButton onClick={()=>{ onItemClicked("sign")}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Sign"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{ onItemClicked("text")}}>
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary="Text"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{ onItemClicked("date")}}>
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary="Date"/>
    </ListItemButton>
   
  </React.Fragment>
   
  );
  
};

export default ToolBar;