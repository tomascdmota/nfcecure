import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import ProductPreview from './ProductPreview'; // Import the ProductPreview component
import createProduct from "../../../../../services/create_product"


const company_id = localStorage.getItem('company_id')

// Styled Box for image preview
const ImagePreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const iPhoneMockup = {
  width: '100%', // Adjusted to use full width of its container
  maxWidth: '325px', // Set a max width for larger screens
  height: '70vh',
  backgroundColor: '#ffffff',
  borderRadius: '28px',
  border: '10px solid #000',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto', // Center the mockup horizontally
};

const PreviewContainer = styled(Box)({
  width: '100%',
  height: '100%',
  overflow: 'auto',
});

export default function NewProductForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    description: '',
    varieties: '',
    region: '',
    alcoholContent: 12,
    format: '',
    grapes: '',
    servingTemp: 8,
    taste: '',
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } else {
      alert('Please select a valid image file.');
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    // Construct the product data
    const productData = {
      name: formData.name,
      description: formData.description,
      varieties: formData.varieties,
      region: formData.region,
      alcoholContent: formData.alcoholContent,
      format: formData.format,
      grapes: formData.grapes,
      servingTemp: formData.servingTemp,
      taste: formData.taste,
      image: formData.image,
      company_id: company_id
    };

    try {
      // Assuming createProduct is a function that sends the data to the server
      const responseData = await createProduct(productData);

      if (responseData) {
        navigate('/dashboard/products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      image: null,
      name: '',
      description: '',
      varieties: '',
      region: '',
      alcoholContent: 12,
      format: '',
      grapes: '',
      servingTemp: 8,
      taste: '',
    });
    window.history.back();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', paddingTop: '40px' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 1,
            left: 1, // Adjusted to ensure proper placement on mobile
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={() => window.history.back()}
            sx={{
              backgroundColor: '#1877F2',
              color: "white",
              '&:hover': {
                backgroundColor: '#0C44AE',
              },
            }}
          >
            <Iconify icon="eva:arrow-back-outline" />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Create New Product
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              {/* Image Upload */}
              <FormControl fullWidth>
                <InputLabel>Background Image</InputLabel>
                <ImagePreview
                  sx={{
                    backgroundImage: formData.image
                      ? `url(${formData.image})`
                      : 'none',
                  }}
                >
                  {!formData.image && <Typography>Upload an image</Typography>}
                </ImagePreview>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                  startIcon={<Iconify icon="eva:upload-outline" />}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </FormControl>

              {/* Form Fields */}
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Varieties"
                name="varieties"
                value={formData.varieties}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <Typography gutterBottom>Alcohol Content (% ABV)</Typography>
              <Slider
                name="alcoholContent"
                value={formData.alcoholContent}
                onChange={(e, value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    alcoholContent: value,
                  }))
                }
                valueLabelDisplay="auto"
                min={5}
                max={40}
                step={0.5}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="187.5 ml">187.5 ml</MenuItem>
                  <MenuItem value="250 ml">250 ml</MenuItem>
                  <MenuItem value="375 ml">375 ml</MenuItem>
                  <MenuItem value="500 ml">500 ml</MenuItem>
                  <MenuItem value="750 ml">750 ml</MenuItem>
                  <MenuItem value="1 L">1 L</MenuItem>
                  <MenuItem value="1.5 L">1.5 L</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Grapes"
                name="grapes"
                value={formData.grapes}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <Typography gutterBottom>Serving Temperature (°C)</Typography>
              <Slider
                name="servingTemp"
                value={formData.servingTemp}
                onChange={(e, value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    servingTemp: value,
                  }))
                }
                valueLabelDisplay="auto"
                min={0}
                max={20}
                step={0.5}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Taste"
                name="taste"
                value={formData.taste}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
           
                    flex: 1,
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Create Product
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF6B6B',
                    '&:hover': {
                      backgroundColor: '#FF4B4B',
                    },
                    flex: 1,
                  }}
                  type="button"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                ...iPhoneMockup,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PreviewContainer>
                <ProductPreview productData={{ ...formData, image: formData.image }} />
              </PreviewContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
