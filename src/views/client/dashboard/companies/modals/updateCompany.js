import React, {useContext,useEffect, useState,} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Input  from '@mui/material/Input';
import InputLabel  from '@mui/material/InputLabel';
import axios from 'axios'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../../../../../context/auth-context";

const theme = createTheme();


const UpdateCompany = (props) => {

    const [errors, setErrors] = useState('');
    const [values] = useState(props.currentData);
    const authContext = useContext(AuthContext)
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
       
        axios.put('https://localhost:44375/api/Companies/update-company',updateCompany,config)
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
         <InputLabel>Company Name</InputLabel>
            <Input 
             required
             fullWidth
             id="name"
            defaultValue={values.name}
            label="Company Name"
            name="name"
            autoComplete="off"
            />
         
         <InputLabel>Tax Identification Number</InputLabel>
            <Input 
            required
            fullWidth
            defaultValue={values.tax_id}
            name="tax_id"
            label="Tax Identification"
            id="tax_id"
            autoComplete="off"
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
export default UpdateCompany;