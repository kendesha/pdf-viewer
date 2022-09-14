import React, {useContext,useEffect, useState,} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import axios from 'axios'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../../../../../context/auth-context";

const theme = createTheme();


const CreateCompany = (props) => {
    const [errors, setErrors] = useState('');
    const authContext = useContext(AuthContext)
    const token =  authContext.token;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const createCompany = {
          name: data.get('name'),
          tax_id: data.get('tax_id'),
        };
     
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post('/Companies/create-company',createCompany,config)
        .then(response => {
           if(response.data.succeeded){
               props.handleClose(false);
           }
           
        })
        .catch(error => {console.log(error)})
      
    };
 

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
        sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
            
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,textAlign: 'center'}} className="login-form">
        <h3>Add Company</h3>
        <h4>{errors}</h4>
            <TextField
            margin="normal"
            required
            fullWidth
            variant='standard'
            id="name"
            label="Company Name"
            name="name"
            autoComplete="off"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="tax_id"
            label="Tax Identification"
            id="tax_id"
            variant='standard'
            autoComplete="off"
          
            />
            <Button
            type="submit"
            fullWidth
            style= {{backgroundColor: "#EB5F40"}}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >Add
            </Button>
        
        </Box>
        </Box>
    
    </Container>
    </ThemeProvider>
  
  );
}
export default CreateCompany;