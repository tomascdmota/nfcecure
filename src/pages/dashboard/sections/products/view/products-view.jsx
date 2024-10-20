import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------
const URL = import.meta.env.VITE_DEV_URL;

export default function ProductsView() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);

  const navigateToProduct = (product_id) => {
    window.open(`/product/${product_id}`, '_blank');
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {

      try {

        const products_response = await axios.get(`${URL}/products`, {headers:{'Content-Type': "application/json", 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}});
        setProducts(products_response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{minWidth:"90%", minHeight:"80%"}}>
      <Typography variant="h3" sx={{ mb: 5, fontFamily:"Mona sans" }}>
        PRODUCTS
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters 
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />

          <Button
            sx={{
              backgroundColor: "#822341",
              color: "#FFDEE4",
              borderRadius: '80px',
              fontSize:"1rem",
              '&:hover': {
                boxShadow: 8,
                transform: 'scale(1.05)',
                transition: '0.1s ease-in-out',
                cursor: 'pointer',
              },
            }}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/dashboard/products/new')}
          >
            New Product
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            // Construct the full image URL
            const imageUrl = `${URL}${product.image_path}`;
            
            return (
              <Grid item key={String(product.id)} xs={12} sm={6} md={3} onClick={() => navigateToProduct(product.id)} target="_blank">
                <ProductCard product={{ ...product, imageUrl }} onClick={() => navigateToProduct(product.id)} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              No products available.
            </Typography>
          </Grid>
        )}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
