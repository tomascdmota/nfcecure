import  { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductCarousel from './components/ProductCard/productcard.jsx';
import TasteIndicator from './components/TasteIndicator/TasteIndicator.jsx';
import exampleImage from './vinho.png'; 
import logo from './assets/logobranco.png';
import logocor from './assets/logocor.png'
import uvabranca from './assets/uvabranca.png'
import uvarose from './assets/uvarose.png'
import uvatinto from './assets/uvatinto.png'
import uvaverde from './assets/uvaverde.png'
import pasta from './assets/pasta.png'
import cheese from './assets/cheese.png'
import seafood from './assets/seafood.png'
import steak from './assets/steak.png'

import './product.scss'; // Import your CSS or SCSS file

function Product() {
  const [productData, setProductData] = useState(null);
  const [showScrollLogo, setShowScrollLogo] = useState(false); // State to manage logo
  const [menuIconColor, setMenuIconColor] = useState('white'); // State for menu icon color
  const [blurEffect, setBlurEffect] = useState(''); // State for blur effect


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const targetSectionRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5225/products/86b9708a-1b63-4497-a3f5-2c5f27ff8a2d');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (productData) {
      document.title = `${productData.name}`;
    }
  }, [productData]);
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current && targetSectionRef.current) {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        const targetPosition = targetSectionRef.current.getBoundingClientRect().top;
        if (targetPosition <= navbarHeight) {
          setShowScrollLogo(true);
          setMenuIconColor('#4C1B2E');
          setBlurEffect('blur(2px)'); // Change menu icon color
        } else {
          setShowScrollLogo(false);
          setMenuIconColor('white');
          setBlurEffect(''); // Reset to white
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <title>aaa</title>
      {/* Header with burger menu and logo */}
      <AppBar
      ref={navbarRef}
        position="fixed"  // Fixed position to float on top of the hero section
        sx={{ bgcolor: 'rgba(255, 255, 255, 0)', boxShadow: 'none', borderBottom: '', zIndex: 1201 , backdropFilter: isMobile ? blurEffect: '', // Apply blur effect
          transition: 'backdrop-filter 0.3s ease, background-color 0.3s ease',}}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" sx={{color: menuIconColor}} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box component="img" src={showScrollLogo ? logocor : logo} alt="Logo" sx={{ height: 60, width: 'auto' }} />
        </Toolbar>
      </AppBar>

      {/* Main Content Box with Background Image */}
      <Box
        sx={{
          height: isMobile? '80vh' : "80vh", // Box height is 95% of the viewport height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
          paddingTop: isMobile ? 10 : 3,
          backgroundImage: `url(https://images.pexels.com/photos/21393/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`, // Set the background image
          backgroundSize: 'cover', // Ensure the background image covers the entire area
          backgroundPosition: 'center', // Center the background image
          position: 'relative', // Relative position for the floating header
        }}
      >
        {/* Typography Section */}
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: "#fff", fontFamily:"Garamond" }}>
            <span style={{fontFamily:"SloopScriptThree"}}>E</span>sporão Rosé
          </Typography>

        {/* Image Section */}
        <Box
          component="img"
          src={exampleImage}
          alt="Example"
          sx={{
            height: isMobile ? '50%' : '60%',  // Responsive height: 100% for mobile, 60% for larger screens
            width: '100%',
            objectFit: 'contain',
            borderRadius: 2,
            mt: isMobile? "0px": '20px',
            mb: isMobile ? "0px": "0px", // Remove margin bottom from image
          }}
        />

        {/* Icons Section */}
        <Container 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
          }}
        >
          <Box> {/* Centering the grid items */}
            <Grid container spacing={1} sx={{ maxWidth: 'fit-content', flexWrap: 'wrap' }}> {/* Wrap icons if needed */}
              <Grid item xs={3} sm={3} md={3}> {/* Adjusted column size for mobile */}
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={uvatinto}
                    alt="Uva Branca"
                    sx={{ height: 90, width: 'auto', mb: 0, mt: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={uvarose}
                    alt="Uva Rosé"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={uvaverde}
                    alt="Uva Verde"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={uvabranca}
                    alt="Uva Branca"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Text Section */}
        <Container 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            padding: 0,
            mb: 0, // Adjust margin-bottom to ensure proper spacing
            mt: 0, // Remove margin-top to reduce space above text
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontSize: '0.95 rem', 
              width: isMobile? '90%' : "50%", 
              fontFamily:"Montserrat-Regular",
              textAlign: 'center' // Center the text within the container
            }}
          >
            O Esporão Reserva Tinto é obtido unicamente a partir de uvas da Herdade do Esporão.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" ref={targetSectionRef} >
        {/* Name at the Top */}
        <Box sx={{ textAlign: 'center', mb: 4, mt:5 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: "#e96b65", fontFamily:"Garamond" }}>
            <span style={{fontFamily:"SloopScriptThree"}}>E</span>sporão
          </Typography>
          <Typography  variant="h6" sx={{color:"#ee8d9d", fontFamily:"Montserrat-Regular"}}> 
            PORTUGAL, MINHO, VINHO ROSE
          </Typography>
        </Box>

        {/* Grid Layout for Image and Details */}
        <Grid container spacing={0} alignItems="center">
          {/* Left Column: Region and Grapes */}
          <Grid item xs={2.5} md={3}>
            <Box sx={{ textAlign: 'right', pr: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily:"Garamond", color:"#5151A8", fontSize: { xs: '1.5rem', md: '2rem' } }}>Região</Typography>
              <Typography sx={{ mb: 2, fontFamily:"Montserrat-Regular", color:"#BDBDDB", fontSize: { xs: '0.8rem', md: '0.8rem' } }}>Herdade do Esporão,<br></br> Alentejo, Portugal</Typography>

              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily:"Garamond", color:"#5151A8", fontSize: { xs: '1.5rem', md: '2rem' } }}>Uvas</Typography>
              <Typography sx={{ mb: 2, fontFamily:"Montserrat-Regular", color:"#BDBDDB", fontSize: { xs: '0.8rem', md: '0.8rem' } }}>Touriga Nacional, Syrah,<br></br> Petit Verdot, Touriga Franca</Typography>
            </Box>
          </Grid>

          {/* Center Column: Varieties and Image */}
          <Grid item xs={7} md={6}>
            {/* Varieties Section above Image */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily:"Garamond", color:"#5151A8", fontSize: { xs: '1.5rem', md: '2rem' } }}>Castas</Typography>
              <Typography sx={{ mb: 2, fontFamily:"Montserrat-Regular", color:"#BDBDDB", fontSize: { xs: '0.8rem', md: '0.8rem' } }}>Petit Verdot</Typography>
            </Box>
            
            {/* Image */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: { xs: 2, md: 0 } }}>
              <img
                src="https://res.cloudinary.com/dnho57ne8/image/upload/v1718320657/esporao_tinto_kwnvgm.png"
                alt="Wine Bottle"
                style={{ maxWidth: '100%', height: 'auto', width: { xs: '90%', md: '100%' } }}
              />
            </Box>
          </Grid>

          {/* Right Column: Alcohol Content and Format */}
          <Grid item xs={2} md={3}>
            <Box sx={{ textAlign: 'left', pl: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily:"Garamond", color:"#5151A8", fontSize: { xs: '1.5rem', md: '2rem' } }}>Álcool</Typography>
              <Typography sx={{ mb: 2, fontFamily:"Montserrat-Regular", color:"#BDBDDB", fontSize: { xs: '1rem', md: '1rem' }, marginLeft:2 }}>13%</Typography>

              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily:"Garamond", color:"#5151A8", fontSize: { xs: '1.5rem', md: '2rem' } }}>Formato</Typography>
              <Typography sx={{ mb: 2, fontFamily:"Montserrat-Regular", color:"#BDBDDB", fontSize: { xs: '0.8rem', md: '0.8rem' } }}>750 ml </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Paladar Section */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily:"Garamond", color:"#5151A8", fontSize:"2rem"}}>Paladar</Typography>
          <TasteIndicator tasteValue="7" />
          <TasteIndicator tasteValue="5" />
          <TasteIndicator tasteValue="3" /> {/* Replace '7' with the actual taste value */}
        </Box>

        {/* Similar Products Carousel */}
        <Container 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
          }}
        >
          <Box mt={3}> {/* Centering the grid items */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color:"#5151A8", fontSize:"2rem", fontFamily:"Garamond" }}>Para acompanhar</Typography>
            <Grid container spacing={1} sx={{ maxWidth: 'fit-content', flexWrap: 'wrap' }}> {/* Wrap icons if needed */}
              <Grid item xs={3} sm={3} md={3}> {/* Adjusted column size for mobile */}
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={cheese}
                    alt="Uva Branca"
                    sx={{ height: 90, width: 'auto', mb: 0, mt: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={steak}
                    alt="Uva Rosé"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={seafood}
                    alt="Uva Verde"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={pasta}
                    alt="Uva Branca"
                    sx={{ height: 90, width: 'auto', mb: 0 }} // Remove margin-bottom from icon
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color:"#5151A8", fontSize:"2rem", fontFamily:"Garamond" }}>A produtora recomenda</Typography>
          <ProductCarousel /> {/* Carousel for similar products */}
        </Box>

        {/* Winery Information */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h4" sx={{ color: '#000', fontWeight: 'bolder' }}>
            Winery
          </Typography>
          <Typography variant="h6" sx={{ color: '#000', mt: 1 }}>
            Fonte Pequena
          </Typography>
          <Box
            component='img'
            src="https://www.esporao.com/wp-content/uploads/2021/12/DJI_0011-2-800x450.jpg"
            alt="Winery Image"
            sx={{
              width: '80%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '16px',
              display: 'block',
              margin: '16px auto',
              objectFit: 'cover'
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: '#000' }} />
            <Typography variant="body1" sx={{ color: '#000' }}>
              Portugal, Minho, Vinho Verde
            </Typography>
          </Box>
        </Box>

        {/* Serving Temperature */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>Temperatura recomendada de consumo</Typography>
          <Typography variant="h6" sx={{color: '#000'}}>10.5 °C</Typography> {/* Replace with actual serving temperature */}
        </Box>
      </Container>
        
      <footer className="text-center mt-8">
        <Typography variant="h6" className="text-lg">What's in my bottle? Conheça as suas bebidas</Typography>
      </footer>
    </div>
  );
}

export default Product;
