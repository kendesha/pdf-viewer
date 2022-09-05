import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useNavigate } from 'react-router-dom';

export default function MenuItems (props) { 

  const navigate = useNavigate()

  const handleClick = (path) => {
      navigate(path)
  }

  return(
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{ handleClick("/client/companies")}}>
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Companies"  />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DriveFileRenameOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Signatures" />
    </ListItemButton>
  </React.Fragment>
)
};

