import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.scss'; // Import Tailwind CSS in your Sass file
import ProductCarousel from './components/ProductCard/productcard.jsx';
import TasteIndicator from './components/TasteIndicator/TasteIndicator.jsx';

function Product() {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/product/86b9708a-1b63-4497-a3f5-2c5f27ff8a2d');
        
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className='header'>
        <h2 className="text-2xl font-bold">{productData.name}</h2>
      </div>
      <div className="wine-list">
        <div className="wine-card grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src="https://cdn.dribbble.com/users/8518551/screenshots/19237773/media/7ce6750af5fd54801bc1d501ff0b64d4.jpg"
            alt="Wine Bottle"
            className="wine-image-top mb-4 md:mb-0 md:col-span-1"
          />
          <div className='product-description md:col-span-1'>
            <p className="text-gray-700">{productData.description}</p>
          </div>
          <div className='characteristics'>
            <h1 className="text-xl font-bold">Informações do produto</h1>
          </div>
          <div className="wine-details-container flex flex-col md:flex-row items-center md:items-start gap-4">
            <img
              src="https://res.cloudinary.com/dnho57ne8/image/upload/v1718320657/esporao_tinto_kwnvgm.png"
              alt="Wine Bottle"
              className="wine-image-right w-48 md:w-auto md:max-w-xs"
            />
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
                <h1 className='title text-lg font-semibold'>Álcool</h1>
                <p className='description'>{productData.alcohol_Content}</p>
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
            <h2>{productData.serving_Temperature}</h2>
          </div>
        </div>
      </div>
      <footer className="text-center mt-8">
        <h1 className="text-lg">NFCECURE, conheça suas bebidas</h1>
      </footer>
    </div>
  );
}

export default Product;
