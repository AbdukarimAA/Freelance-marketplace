import React from 'react';
import Slider from 'infinite-react-carousel'
import './Slide.scss';
// import CategoryCard from "../categoryCard/CategoryCard";
// import {cards} from "../../data";

const Slide = ({children, slidesToShow, arrowsScroll}) => {
    return (
        <div className='slide'>
            <div className="container">
                <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                    {children}
                    {/*{cards.map(card => (*/}
                    {/*    <CategoryCard item={card} key={card.id}/>*/}
                    {/*))}*/}
                </Slider>
            </div>
        </div>
    );
};

export default Slide;