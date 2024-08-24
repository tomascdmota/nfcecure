import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';

import { products } from '../../../_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const navigate = useNavigate()
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container >
      <Typography variant="h3" sx={{ mb: 5 }}>
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
          <Button sx={{
              backgroundColor:"#822341",
              color:"#FFDEE4" ,
              borderRadius: '80px',
             '&:hover': {
              boxShadow: 8,
              transform: 'scale(1.05)',
              transition: '0.1s ease-in-out',
              cursor: 'pointer' // Increase shadow on hover
            },
          }}
          variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/dashboard/products/new')}>
          New Product
        </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
