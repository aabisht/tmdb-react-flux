import React from "react";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import MediaCard from "./media-card";
import "react-multi-carousel/lib/styles.css";

const CardSlider = (props) => {
  const settings = {
    responsive: {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 6,
        slidesToSlide: 6,
        partialVisibilityGutter: 11,
      },
      desktop: {
        breakpoint: { max: 1199, min: 768 },
        items: 4,
        slidesToSlide: 4,
        partialVisibilityGutter: 16,
      },
      mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 2,
        slidesToSlide: 2,
        partialVisibilityGutter: 32,
      },
    },
    showDots: true,
    centerMode: false,
    partialVisible: true,
  };

  return props.sliderData.length > 0 ? (
    <div className="card-slider-container">
      {props.sliderTitle ? (
        <div className="card-slider-title-wrapper">
          <div className="h3 mb-3">
            <a
              href="https://www.google.com/"
              className="d-inline-flex align-items-center "
            >
              <strong>{props.sliderTitle}</strong>
              <span className="material-icons ms-2 card-slider-title-arrow">
                arrow_forward_ios
              </span>
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="card-slider-wrapper">
        <Carousel
          responsive={settings.responsive}
          showDots={settings.showDots}
          centerMode={settings.centerMode}
          partialVisible
          infinite
        >
          {props.sliderData.map((cardData, index) => {
            return <MediaCard key={index} mediaCardData={cardData}></MediaCard>;
          })}
        </Carousel>
      </div>
    </div>
  ) : (
    <></>
  );
};

CardSlider.prototype = {
  sliderData: PropTypes.object.required,
  sliderTitle: PropTypes.string,
};

export default CardSlider;
