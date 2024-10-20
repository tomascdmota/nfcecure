import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../services/auth'; // Adjust the path as necessary
import HelpModal from './HelpModal.jsx'; // Adjust the import path as necessary

const defaultTheme = createTheme();

export default function SignIn() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")

    if(accessToken){
      navigate('/dashboard');
    }
  
   
  }, [navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Prepare data to send
    const requestData = {
      username,
      password,
    };

    try {
      // Send POST request using the TypeScript service
      const responseData = await login(requestData.username, requestData.password);
      
      if (responseData && responseData.message === 'Login successful') {
        localStorage.setItem("access_token", responseData.access_token)
        navigate('/dashboard');
    } else {
        console.error('Login failed:', responseData.message);
    }
    } catch (error) {
      // Handle errors
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Grid container sx={{ height: '100vh' }}>
          {/* Left Panel */}
          <Grid
            item
            xs={false}
            sm={7}
            md={8}
            sx={{
              position: 'relative',
              backgroundImage: 'url(https://images.unsplash.com/photo-1561443883-c50a02040bce?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here
                zIndex: 1,
              },
              '& > *': {
                position: 'relative',
                zIndex: 2,
              },
            }}
          >
            <Box sx={{ textAlign: 'center', color: '#ffffff', p: 4 }}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Welcome back!
              </Typography>
              <Typography variant="h6">
                Track insights, manage your products, and optimize your marketing campaigns all in one place.<br></br>
                 Access detailed analytics on NFC tag interactions, discover trends, and stay updated on user activities.<br></br> 
                 Your portal to smarter decisions and better results starts here.
              </Typography>
            </Box>
          </Grid>

          {/* Right Panel */}
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#ffffff', p: 4 }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 400,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography component="h1" variant="h4" sx={{ flexGrow: 1 }}>
                  Sign In
                </Typography>
                <Avatar sx={{ bgcolor: '#822341' }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor:"#822341" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" onClick={() => window.open("/auth/reset-password", '_blank',)}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Link href="#" variant="body2" onClick={() => setOpenModal(true)}>
                      Can't sign in?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <HelpModal open={openModal} onClose={() => setOpenModal(false)} />
      </ThemeProvider>
    </>
  );
}
