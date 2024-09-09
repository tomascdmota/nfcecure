import React from 'react';
import { Card, CardMedia, Typography, Box, Container, Button } from '@mui/material';

const wines = [
  {
    company: 'Periquita',
    name: 'Aragonez 2018',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
  },
  {
    company: 'Esporao',
    name: 'Alicante Bouchet, 2015',
    image: "https://www.esporao.com/wp-content/uploads/2021/11/Espor%C3%A3o-AB-Destaque-249x1000.png"
  },
  {
    company: 'Esporao',
    name: 'Touriga Nacional',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/TourigaNacional-2017-Destaque-249x1000-1.png"
  },
  {
    company: 'Casal Garcia',
    name: 'Valpolicella 2017',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
  },
  {
    company: 'Periquita',
    name: 'Aragonez 2018',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
  },
  {
    company: 'Esporao',
    name: 'Alicante Bouchet, 2015',
    image: "https://www.esporao.com/wp-content/uploads/2021/11/Espor%C3%A3o-AB-Destaque-249x1000.png"
  },
  {
    company: 'Esporao',
    name: 'Touriga Nacional',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/TourigaNacional-2017-Destaque-249x1000-1.png"
  },
  {
    company: 'Casal Garcia',
    name: 'Valpolicella 2017',
    image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
  },
];

const ProductCard = ({ wine }) => {
  return (
    <Box sx={{ width: { xs: '60%', sm: '40%', md: '15%' }, flexShrink: 0, textAlign: 'center' }}>
      <Card 
        sx={{
          backgroundColor: '#ffebcf',
          borderRadius: 5,
          padding: 2,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease-in-out',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '250px', // Fixed height for the card
        }}
      >
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px', // Fixed height for the image container
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={wine.image}
            alt={wine.name}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Card>
      <Typography 
        sx={{
          fontFamily: "Garamond", 
          color: "black",
          fontSize: "1.8em",
          marginTop: 1,
          height: '40px', // Fixed height for the typography
          overflow: 'hidden', // Ensure long names do not break the layout
          textOverflow: 'ellipsis', // Add ellipsis for overflowed text
          whiteSpace: 'nowrap', // Keep text on a single line
          textAlign: 'left',
          fontWeight:"bold"
        }}
        >
        {wine.name}
      </Typography>
      <Typography 
        sx={{
          fontFamily: "Montserrat-Regular", 
          color: "black",
          fontSize: "1em",
          height: '40px', // Fixed height for the typography
          overflow: 'hidden', // Ensure long names do not break the layout
          textOverflow: 'ellipsis', // Add ellipsis for overflowed text
          whiteSpace: 'nowrap', // Keep text on a single line
          textAlign: 'left',
          fontWeight:"bolder"
        }}
        >
        {wine.company}
      </Typography>
    </Box>
  );
};

const ProductCarousel = () => {
  return (
    <Container sx={{ backgroundColor: '#F5E4DA', minWidth: "100%", py: 4 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom 
        align="center" 
        sx={{
          fontFamily: "Garamond",
          color: '#303030',
        }}
      >
        Our Featured Products
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden',
          gap: 4,
          px: 4,
          scrollSnapType: 'x mandatory',
          alignItems: 'center',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {wines.map((wine) => (
          <ProductCard key={wine.name} wine={wine} />
        ))}
      </Box>
      <Typography variant="body1" paragraph align="center" sx={{ mt: 2 }}>
        Discover our range of NFC-enabled wine tags designed to enhance your customers' experience.
      </Typography>
      <Button variant="outlined" size="large" sx={{ mt: 2, display: 'block', mx: 'auto' }}>
        Learn More
      </Button>
    </Container>
  );
};

export default ProductCarousel;
