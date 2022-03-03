import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";
import ConfigurationStores from "../../stores/configurationStores";
import DropDown from "./dropdown";
import TabView from "./tab-view";
import apiConstants from "../../api/apiConstants";
import ConfigurationImage from "./configuration-image";

function MediaWatchProviders(props) {
  const mediaType = props.mediaType,
    mediaId = props.mediaId,
    [mediaWatchProviders, setMediaWatchProviders] = useState([]);

  const [defaultLanguage, setDefaultLanguage] = useState(
    ConfigurationStores.getDefaultLanguage()
  );

  const [selectedWatchProvider, setSelectedWatchProvider] = useState();

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaWatchProvidersChange);
    MediaDetailPageStore.addChangeListener(onSetSelectedWatchProviderChange);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);
    mediaDetailPageAction.loadMediaWatchProvider(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaWatchProvidersChange);
      MediaDetailPageStore.removeChangeListner(
        onSetSelectedWatchProviderChange
      );
      ConfigurationStores.removeChangeListner(onDefaultLanguageChange);
    };
  }, [mediaType, mediaId]);

  const onMediaWatchProvidersChange = () => {
    setMediaWatchProviders(MediaDetailPageStore.getMediaWatchProviders());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  const onSetSelectedWatchProviderChange = () => {
    if (
      MediaDetailPageStore.getMediaWatchProviders()?.results &&
      ConfigurationStores.getDefaultLanguage().split("-")[1] in
        MediaDetailPageStore.getMediaWatchProviders()?.results
    ) {
      setSelectedWatchProvider(
        MediaDetailPageStore.getMediaWatchProviders()?.results[
          ConfigurationStores.getDefaultLanguage().split("-")[1]
        ]
      );
    }
  };

  const renderSelectedWatchProvideTabs = (isVisible, header, watchProvider) => {
    if (isVisible) {
      return (
        <div header={header}>
          <div className="d-inline-flex mb-2">
            {watchProvider.map((item, index) => {
              return (
                <div
                  className="page-banner-poster-img-wrapper mb-2 me-2"
                  key={index}
                  data-tip={item.provider_name}
                >
                  <ConfigurationImage
                    path={item.logo_path}
                    alt={item.provider_name}
                    img_type={apiConstants.IMAGE_TYPE_LOGO}
                    img_size_index={0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else return false;
  };

  const handleWatchProviderChange = (event) => {
    setDefaultLanguage(event.currentTarget.innerText);
    setSelectedWatchProvider(
      MediaDetailPageStore.getMediaWatchProviders()?.results[
        event.currentTarget.innerText
      ]
    );
  };

  const filterDefaultLanguage = (filterText) => {
    return filterText.match("-") ? filterText.split("-")[1] : filterText;
  };

  ReactTooltip.rebuild();

  return mediaWatchProviders &&
    mediaWatchProviders.results &&
    Object.keys(mediaWatchProviders?.results).length > 0 &&
    selectedWatchProvider ? (
    <div className="media-detail-watch-provider-wrapper">
      <DropDown
        dropdownText={[
          <div
            className="watch-provider-selector-text d-flex align-item-center justify-content-between"
            key="watchProviderSelector"
          >
            <span>
              Watch Provider Country - {filterDefaultLanguage(defaultLanguage)}
            </span>
            <span className="material-icons-outlined">keyboard_arrow_down</span>
          </div>,
        ]}
        dropdownList={[
          <ul
            className="list-unstyled dropdown-list-wrappper watch-provider-dropdown-list-wrappper"
            key="watchProviderDropdown"
          >
            {Object.keys(mediaWatchProviders?.results).map((item, index) => {
              let activeClass =
                item === filterDefaultLanguage(defaultLanguage) ? "active" : "";
              return (
                <li key={index} className={activeClass}>
                  <button
                    type="button"
                    className="btn d-block text-nowrap w-100"
                    onClick={handleWatchProviderChange}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>,
        ]}
        dropdownPosition="left"
        dropdownTextClass="secondary outline text-start"
        dropdownListClass="watch-provider-dropdown"
      />
      <div className="mt-3">
        <TabView>
          {renderSelectedWatchProvideTabs(
            selectedWatchProvider?.ads && selectedWatchProvider?.ads.length > 0,
            "Ads",
            selectedWatchProvider?.ads
          )}
          {renderSelectedWatchProvideTabs(
            selectedWatchProvider?.buy && selectedWatchProvider?.buy.length > 0,
            "Buy",
            selectedWatchProvider?.buy
          )}
          {renderSelectedWatchProvideTabs(
            selectedWatchProvider?.rent &&
              selectedWatchProvider?.rent.length > 0,
            "Rent",
            selectedWatchProvider?.rent
          )}
          {renderSelectedWatchProvideTabs(
            selectedWatchProvider?.flatrate &&
              selectedWatchProvider?.flatrate.length > 0,
            "Flatrate",
            selectedWatchProvider?.flatrate
          )}
        </TabView>
      </div>
    </div>
  ) : (
    <></>
  );
}

MediaWatchProviders.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaWatchProviders;
