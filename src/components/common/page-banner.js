import React from "react";

function PageBanner() {
  return (
    <div className="page-banner">
      <div className="page-banner-wrapper">
        <div className="page-banner-bg-wrapper">
          <img
            src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/ykElAtsOBoArgI1A8ATVH0MNve0.jpg"
            alt="Loki"
            className="page-banner-img-bg"
          />
          <div className="page-banner-overlay-bg"></div>
        </div>
        <div className="page-banner-content-wrapper d-flex align-items-end h-100">
          <div className="page-banner-content-container container d-flex align-items-end justify-content-between pe-0">
            <div className="page-banner-info-wrapper">
              <div className="page-banner-info-container">
                <h2 className="title">
                  <strong>Loki (2021)</strong>
                </h2>
                <p className="description">
                  After stealing the Tesseract during the events of “Avengers:
                  Endgame,” an alternate version of Loki is brought to the
                  mysterious Time Variance Authority, a bureaucratic
                  organization that exists outside of time and space and
                  monitors the timeline. They give Loki a choice: face being
                  erased from existence due to being a “time variant”or help fix
                  the timeline and stop a greater threat.
                </p>
                <a
                  href="/"
                  className="btn outline white d-inline-flex align-items-center"
                >
                  <span className="material-icons-outlined me-2">info</span>
                  <span>More Info</span>
                </a>
              </div>
            </div>
            <div className="page-banner-meta-wrapper">
              <div className="rating-wrapper d-flex align-items-center justify-content-center">
                <span className="material-icons-outlined me-2">grade</span>
                <span className="rating-value">7.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageBanner;
