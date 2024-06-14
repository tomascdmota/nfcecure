import React from 'react';
import './product.scss'; // Assuming you have a product.scss file for styling

function Product() {
  return (
    <div className="app-container">
      <div className='header'>
        <h2>BRACCETO LAMBRUSCO, 2021</h2>
      </div>
      <div className="wine-list">
        <div className="wine-card">
          <img
            src="https://cdn.dribbble.com/users/8518551/screenshots/19237773/media/7ce6750af5fd54801bc1d501ff0b64d4.jpg"
            alt="Wine Bottle"
            className="wine-image-top" // Class for the top image
          />
          <div className='product-description'>
              <p>
                Bracetto is a huge, ripe Italian grape which is the pride of the
                Apulia region in the south of Italy.
              </p>
            </div>
            <div className='characteristics'>
                <h1>Informações do produto</h1>
              </div>
          <div className="wine-details-container">
            <div className="wine-details">
              <div className='wine-detail'>
                <h1 className='title'>Tipo</h1>
                <p className='description'>Tinto Semi-seco</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Região</h1>
                <p className='description'>Bordeaux, França</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Álcool</h1>
                <p className='description'>14%</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Capacity</h1>
                <p className='description'>750ml</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Grapes</h1>
                <p className='description'>Arinto, Loureiro</p>
              </div>
              <div className='wine-detail'>
                <h1 className='title'>Foods</h1>
                <p className='description'>Steak, pasta and Italian</p>
              </div>
              <div className='reviews'> 
             <p>★★★★★ (81 Reviews)</p>
          </div>
            </div>
            
            <img
              src="https://res.cloudinary.com/dnho57ne8/image/upload/v1718320657/esporao_tinto_kwnvgm.png"
              alt="Wine Bottle"
              className="wine-image-right" // Class for the right image
            />
          </div>


          <div className='taste'>
            <h1>Taste</h1>
            <h2>Soft, clean and refreshing, with floral-fruity notes and a sligh acidity</h2>
            
          </div>
          <div className='similar'>
            <h1 className='similar-title'>Wines similar to Bracetto</h1>
            <h5>15 items</h5>
          </div>

          <div className='serving-temperature'>
            <h1>Serving Temperature</h1>
            <h2>10ºC</h2>
          </div>
        </div>
      </div>
      <footer>
        <h1>NFCECURE, get to know your beverages</h1>
      </footer>
    </div>
  );
}

export default Product;
