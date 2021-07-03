import React from "react";

function MediaCard() {
  return (
    <div className="media-card-wrapper">
      <div className="media-card-container">
        <div className="media-card">
          <div className="media-img-wrapper">
            <img
              src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg"
              alt="Loki"
            />
          </div>
          <div className="media-hover-wrapper">
            <div className="media-hover-img-wrapper">
              <img
                src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/ykElAtsOBoArgI1A8ATVH0MNve0.jpg"
                alt="Loki"
              />
            </div>
            <div className="media-hover-video-wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MediaCard;
