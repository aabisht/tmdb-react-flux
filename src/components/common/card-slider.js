import React, { useState } from "react";
import PropTypes from "prop-types";
import TinySlider from "tiny-slider-react";
import MediaCard from "./media-card";

function CardSlider(props) {
  const settings = {
    lazyload: true,
    nav: true,
    controls: false,
    mouseDrag: false,
    items: 2,
    startIndex: 0,
    loop: true,
    autoplay: false,
    slideBy: "page",
    responsive: {
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  };

  const [sliderRef, setSliderRef] = useState();

  const onGoTo = (dir) => {
    sliderRef.slider.goTo(dir);
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
        <TinySlider settings={settings} ref={(ts) => setSliderRef(ts)}>
          {props.sliderData.map((cardData, index) => {
            return <MediaCard key={index} mediaCardData={cardData}></MediaCard>;
          })}
        </TinySlider>
        <div className="slider-nav">
          <button
            type="button"
            className="slider-nav-btn slider-nav-btn-pre"
            onClick={() => onGoTo("prev")}
          >
            <span className="material-icons">arrow_back_ios</span>
          </button>
          <button
            type="button"
            className="slider-nav-btn slider-nav-btn-next"
            onClick={() => onGoTo("next")}
          >
            <span className="material-icons">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

CardSlider.prototype = {
  sliderData: PropTypes.object.required,
  sliderTitle: PropTypes.string,
};

export default CardSlider;
