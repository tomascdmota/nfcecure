import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './product.scss'; // Ensure Tailwind CSS is included
import ProductCarousel from './components/ProductCard/productcard.jsx';
import TasteIndicator from './components/TasteIndicator/TasteIndicator.jsx';

// Styled Box for image preview
const ImageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto', // Adjusts height automatically based on image aspect ratio
  position: 'relative',
  overflow: 'hidden', // Hide any overflow from the image
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover', // Ensures the image covers the container without distortion
  display: 'block', // Removes the default inline spacing below the image
}));

function ProductPreview({ productData }) {
  if (!productData) return <div>Loading...</div>; // Handle the case where productData is not yet available

  return (
    <div className="app-container">
      <div className="header w-full px-4 py-2 bg-white shadow-md">
        <h2 className="text-2xl font-bold">{productData.name}</h2>
      </div>
      <div className="wine-list">
        <div className="wine-card grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageWrapper>
            <StyledImage
              src={productData.image || "https://cdn.dribbble.com/users/8518551/screenshots/19237773/media/7ce6750af5fd54801bc1d501ff0b64d4.jpg"}
              alt="Wine Bottle"
            />
          </ImageWrapper>
          <div className='product-description md:col-span-1'>
            <p className="text-gray-700">{productData.description}</p>
          </div>
          <div className='characteristics'>
            <h1 className="text-xl font-bold">Informações do produto</h1>
          </div>
          <div className="wine-details-container flex flex-col md:flex-row items-center md:items-start gap-4">
            <ImageWrapper>
              <StyledImage
                src="https://res.cloudinary.com/dnho57ne8/image/upload/v1718320657/esporao_tinto_kwnvgm.png"
                alt="Wine Bottle"
              />
            </ImageWrapper>
            <div className="wine-details">
              <div className='wine-detail'>
                <h1 className='title text-lg font-semibold'>Castas</h1>
                <p className='description'>{productData.varieties}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title text-lg font-semibold'>Região</h1>
                <p className='description'>{productData.region}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title text-lg font-semibold'>Álcool (%)</h1>
                <p className='description'>{productData.alcohol_content}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title text-lg font-semibold'>Formato</h1>
                <p className='description'>{productData.format}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title text-lg font-semibold'>Uvas</h1>
                <p className='description'>{productData.grapes}</p>
              </div>
            </div>
          </div>
          <div className='recomendation'>
            <h1 className='title text-xl font-bold'>Recomenda-se</h1>
            <p className='description'>Steak, pasta and Italian</p>
          </div>
          <div className='taste'>
            <h1 className="text-xl font-bold">Paladar</h1>
            <TasteIndicator tasteValue="7" />
          </div>
          <div className='similar'>
            <h1 className='similar-title text-xl font-bold'>A produtora recomenda</h1>
            <ProductCarousel />
          </div>
          <div className='serving-temperature'>
            <h1 className="text-xl font-bold">Temperatura recomendada de consumo</h1>
            <h2>{productData.serving_temperature} °C</h2>
          </div>
        </div>
      </div>
      <footer className="text-center mt-8">
        <h1 className="text-lg">NFCECURE, conheça suas bebidas</h1>
      </footer>
    </div>
  );
}

export default ProductPreview;
