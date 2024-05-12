import React from 'react';
import {CaroselData} from './CaroselData.js'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};


const MainCarosel = () => {

    const items = CaroselData.map((item)=> <img className='cursor-pointer'
    role='presentation' src={item.image} alt=""/>)

    return (
        <div className='relative z-[-1]'>
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                autoPlay
                autoPlayInterval={1000}
                infinite
            />
        </div>
    )
};

export default MainCarosel;