import * as React from 'react';
import logo from '../../assests/images/logo.png';
import '../../styles/login.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../context/auth-context';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

    const [errors, setErrors] = React.useState('');
    const authContext = React.useContext(AuthContext)
  
   const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios.post('https://localhost:7227/api/Users/login',loginData)
         .then(response => {
            var data = response['data']; 
            
            if(data['succeeded'])
            {
                setErrors('')
                authContext.Login(data["data"])
                return
            }
            
            setErrors(data['message'])
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
          <img src={logo} style= {{marginTop: "50px"}} />
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="login-form">
           <h4>{errors}</h4>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              style= {{backgroundColor: "#EB5F40"}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link href="#" variant="body2" style={{color: "white",textDecoration:"none"}}>
                  Forgot password?
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}