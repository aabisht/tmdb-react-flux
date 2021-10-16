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
  };

  return props.sliderData.length > 0 ? (
    <div className="card-slider-container">
      {props.sliderTitle ? (
        <div className="card-slider-title-wrapper">
          <div className="h3 mb-3">
            {props.sliderLink ? (
              <a
                href={props.sliderLink}
                className="d-inline-flex align-items-center "
              >
                <strong className="text-capitalize">{props.sliderTitle}</strong>
                <span className="material-icons ms-2 card-slider-title-arrow">
                  arrow_forward_ios
                </span>
              </a>
            ) : (
              <strong className="text-capitalize">{props.sliderTitle}</strong>
            )}
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
            return (
              <MediaCard
                key={index}
                mediaCardData={cardData}
                mediaCardDataType={props.sliderMediaType}
              ></MediaCard>
            );
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
  sliderLink: PropTypes.string,
  sliderMediaType: PropTypes.string,
};

export default CardSlider;
