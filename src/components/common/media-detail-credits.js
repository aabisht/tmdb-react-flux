import React from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import TabView from "./tab-view";
import CreditsCard from "./credits-card";
import apiConstants from "../../api/apiConstants";

function MediaDetailsCredits(props) {
  const mediaId = parseInt(props.mediaId);
  const intCardVisible = 7;

  const mediaCredits = MediaDetailPageStore.getMediaCredits();

  const toggleCredit = (event) => {
    const cartItem =
      event.currentTarget.parentElement.nextElementSibling.childNodes;
    if (apiConstants.SHOW_MORE === event.currentTarget.textContent) {
      cartItem.forEach((item) => {
        item.classList.remove("d-none");
      });
      event.currentTarget.textContent = apiConstants.SHOW_LESS;
    } else {
      cartItem.forEach((item, index) => {
        if (index > intCardVisible - 1) {
          item.classList.add("d-none");
        }
      });
      event.currentTarget.textContent = apiConstants.SHOW_MORE;
    }
  };

  const renderCreditsTabs = (header, creditsData) => {
    const btnText = apiConstants.SHOW_MORE;
    return (
      <div header={header}>
        {creditsData.length > intCardVisible ? (
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h4 mb-0">{header}</h2>
            <button
              type="button"
              className="btn outline secondary"
              onClick={toggleCredit}
              data-type={header}
            >
              {btnText}
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="d-flex flex-wrap mb-2 credits-data-items-wrapper">
          {creditsData.map((item, index) => {
            const creditsCardClass =
              index > 6 ? "mb-3 me-2 d-none" : "mb-3 me-2";
            return (
              <div className={creditsCardClass} key={index}>
                <CreditsCard
                  adult={item.adult}
                  character={item.character}
                  credit_id={item.credit_id}
                  gender={item.gender}
                  id={item.id}
                  job={item.job}
                  known_for_department={item.known_for_department}
                  name={item.name}
                  order={item.order}
                  original_name={item.original_name}
                  popularity={item.popularity}
                  profile_path={item.profile_path}
                  className="h-100"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return mediaCredits && mediaId === mediaCredits.id ? (
    <TabView>
      {renderCreditsTabs("Cast", mediaCredits?.cast)}
      {renderCreditsTabs("Crew", mediaCredits?.crew)}
    </TabView>
  ) : (
    <></>
  );
}

MediaDetailsCredits.prototype = {
  mediaId: PropTypes.string.required,
};

export default MediaDetailsCredits;
