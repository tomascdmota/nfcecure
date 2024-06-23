import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.scss'; // Assuming you have a product.scss file for styling
import ProductCarousel from './components/ProductCard/productcard.jsx';
import TasteIndicator from './components/TasteIndicator/TasteIndicator.jsx'; // Adjust path as per your file structure

function Product() {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7212/products/53B1D5CA-3A84-44FD-8228-34403BEC164D');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the first render

  if (!productData) {
    return <div>Loading...</div>; // Render a loading indicator while waiting for data
  }

  return (
    <div className="app-container">
      <div className='header'>
        <h2>{productData.name}</h2>
      </div>
      <div className="wine-list">
        <div className="wine-card">
          <img
            src="https://cdn.dribbble.com/users/8518551/screenshots/19237773/media/7ce6750af5fd54801bc1d501ff0b64d4.jpg"
            alt="Wine Bottle"
            className="wine-image-top" // Class for the top image
          />
          <div className='product-description'>
            <p>{productData.description}</p>
          </div>
          <div className='characteristics'>
            <h1>Informações do produto</h1>
          </div>
          <div className="wine-details-container">
            <img
              src="https://res.cloudinary.com/dnho57ne8/image/upload/v1718320657/esporao_tinto_kwnvgm.png"
              alt="Wine Bottle"
              className="wine-image-right" // Class for the right image
            />
            <div className="wine-details">
              <div className='wine-detail'>
                <h1 className='title'>Castas</h1>
                <p className='description'>{productData.varieties}</p> {/* Assuming varieties correspond to grapes */}
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Região</h1>
                <p className='description'>{productData.region}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Álcool</h1>
                <p className='description'>{productData.alcohol_Content}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Formato</h1>
                <p className='description'>{productData.format}</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Uvas</h1>
                <p className='description'>{productData.grapes}</p>
              </div>
            </div>
          </div>
          <div className='recomendation'>
            <h1 className='title'>Recomenda-se</h1>
            <p className='description'>Steak, pasta and Italian</p> 
          </div>
          <div className='taste'>
            <h1>Paladar</h1>
            <TasteIndicator tasteValue="7" /> {/* Display the TasteIndicator component */}
          </div>
          <div className='similar'>
            <h1 className='similar-title'>A produtora recomenda</h1>
            <ProductCarousel />
          </div>
          <div className='serving-temperature'>
            <h1>Temperatura recomendada de consumo</h1>
            <h2>{productData.serving_Temperature}</h2>
          </div>
        </div>
      </div>
      <footer>
        <h1>NFCECURE, conheça suas bebidas</h1>
      </footer>
    </div>
  );
}

export default Product;
