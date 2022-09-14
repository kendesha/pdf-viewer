import React, {useContext,useEffect, useState,} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../../../../../context/auth-context";

const theme = createTheme();

export default function  UpdateCompany(props) {
    const [errors, setErrors] = useState('');
    const authContext = useContext(AuthContext)
    const [formData, setFormData] = useState(
      {
        id: props.currentData.id,
        name: props.currentData.name,
        tax_id: props.currentData.tax_id
      }
    )
   
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    const token =  authContext.token;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const updateCompany = {
            id: props.id,
            name: data.get('name'),
            tax_id: data.get('tax_id'),
          };
       
        axios.put('/Companies/update-company',updateCompany,config)
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
            
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}} className="login-form">
        <h3>Update Company</h3>
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
            onChange={handleChange}
            value={formData.name}
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
            onChange={handleChange}
            value={formData.tax_id}
          
            />
    
            <Button
            type="submit"
            fullWidth
            style= {{backgroundColor: "#EB5F40"}}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
            >
            Update
            </Button>
           
        </Box>
        </Box>
    
    </Container>
    </ThemeProvider>
  
  );
}