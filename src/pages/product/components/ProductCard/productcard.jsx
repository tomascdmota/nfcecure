import React from 'react';
import './productcard.scss';

const wines = [
    {
        type: 'Tinto',
        name: 'Aragonez 2018',
        image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
    },
    {
        type: 'Red',
        name: 'Alicante Bouchet, 2015',
        image: "https://www.esporao.com/wp-content/uploads/2021/11/Espor%C3%A3o-AB-Destaque-249x1000.png"
    },
    {
        type: 'Red',
        name: 'Touriga Nacional',
        image: "https://www.esporao.com/wp-content/uploads/2023/03/TourigaNacional-2017-Destaque-249x1000-1.png"
    },
    {
        type: 'White',
        name: 'Valpolicella 2017',
        image: "https://www.esporao.com/wp-content/uploads/2023/03/Aragonez_2017_Destaque_250x1000.png"
    },
];

const ProductCard = ({ wine }) => {
    return (
        <div className="product-card">
          <div className="product-type">{wine.type}</div>
          <div className="product-name">{wine.name}</div>
          <div className='product-image'><img src={wine.image}/></div>
        </div>
    );
};

const ProductCarousel = () => {
    return (
        <div className="product-carousel">
            {wines.map((wine) => (
                <ProductCard key={wine.name} wine={wine} />
            ))}
        </div>
    );
};

export default ProductCarousel;
