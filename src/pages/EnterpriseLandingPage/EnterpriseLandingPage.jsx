import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled('section')({
  height: '100vh',
  backgroundImage: 'url("https://images.pexels.com/photos/21393/pexels-photo.jpg?cs=srgb&dl=pexels-madebymath-21393.jpg&fm=jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const HeroLogo = styled('img')({
  maxWidth: '200px',
  marginBottom: '20px',
});

const HeroDescription = styled(Typography)({
  color: '#fff',
  textAlign: 'center',
  fontSize: '1.5rem',
  maxWidth: '600px',
});

const Navbar = () => {
  return (
    <AppBar
      position="fixed" // Change to fixed to make the navbar sticky
      sx={{
        backgroundColor: 'transparent', // Initially transparent
        boxShadow: 'none', // Remove the box shadow for transparency
        transition: 'background-color 0.3s ease', // Smooth transition for background color change
        '&.scrolled': {
          backgroundColor: '#fff', // Change to white or any color on scroll
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow when scrolled
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }} /> {/* Empty Box to push content to the center */}

        <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
          <img src="/logocor.png" alt="Logo" style={{ maxWidth: '150px' }} />
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const EnterpriseLandingPage = () => {
  React.useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('header .MuiAppBar-root');
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection>
        <Box sx={{ textAlign: 'center' }}>
          <HeroLogo src="../../assets/whatsinmybottle.png" alt="Logo" />
          <HeroDescription>
          “What's in my Bottle” is dedicated to helping customers discover more 
                about the drinks they enjoy. Whether it's wine or other beverages, we dive into the history, 
                flavor profiles, and perfect pairings to enhance the drinking experience.aa
          </HeroDescription>
        </Box>
      </HeroSection>
      <HeroSection>
        <Box sx={{ textAlign: 'center' }}>
          <HeroLogo src="https://images.pexels.com/photos/21393/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800" alt="Logo" />
          <HeroDescription>
            Welcome to our website. We provide exceptional services to make your life easier.
          </HeroDescription>
        </Box>
      </HeroSection>
    </div>
  );
};

export default EnterpriseLandingPage;
