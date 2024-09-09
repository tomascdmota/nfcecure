import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import './hero.scss';
import ProductCarousel from '../components/ProductCard/productcard';


const LandingPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box>
    {/* Hero Section */}
  

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '70vh', 
          backgroundImage: 'url(https://img.freepik.com/free-photo/people-enjoying-glass-wine-vineyard-with-stunning-nature-landscape_23-2151514985.jpg?t=st=1724516768~exp=1724520368~hmac=c9f55a0c35b740239602021290cfad699803632098cd7301949d9340bb7eb9b0&w=2000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
          <AppBar position="relative" sx={{ background: 'transparent', boxShadow: 'none', zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: 'space-between', fontFamily: "Montserrat-Regular" }}>
          <Box display="flex">
            <Button color="inherit" sx={{ fontFamily: "Montserrat-Regular", fontSize: '1.2rem' }}>Products</Button>
            <Button color="inherit" sx={{ fontFamily: "Montserrat-Regular", fontSize: '1.2rem' }}>Pricing</Button>
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            What's in my bottle?
          </Typography>
          <Box display="flex">
            <Button color="inherit" sx={{ fontFamily: "Montserrat-Regular", fontSize: '1.2rem' }}>Contact</Button>
            <Button color="inherit" sx={{ fontFamily: "Montserrat-Regular", fontSize: '1.2rem' }}>Portal</Button>
          </Box>
        </Toolbar>
      </AppBar>
        <Container
          maxWidth="md"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant={isMobile ? 'h4' : 'h1'} sx={{ fontFamily: "Garamond" }} component="h1" gutterBottom>
            Discover the Essence of Wine with NFC
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h5'} paragraph>
            Experience the art of winemaking like never before. Tap into your wine's story with our NFC tags.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2, backgroundColor: '#EBE7DE', color: "black" }}>
            Get Started
          </Button>
        </Container>
      </Box>
      {/* Products Section */}
      <ProductCarousel/>

      {/* Footer */}
 
      <Box 
        sx={{
          padding: '50px 0',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', color:"#303030" }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph>
            Our NFC wine tags bring your products to life, providing customers with a unique and interactive experience.
          </Typography>
          <Typography variant="body1" paragraph>
            With our easy-to-use platform, you can manage your products, track customer interactions, and analyze metrics all in one place.
          </Typography>
        </Container>
      </Box>


      {/* Footer */}
      <Box 
        sx={{
          padding: '20px 0',
          backgroundColor: '#333',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2024 What's in my bottle. All rights reserved.
        </Typography>
      </Box>    
    </Box>
  );
};

export default LandingPage;
