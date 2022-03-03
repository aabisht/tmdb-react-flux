import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import apiConstants from "../../api/apiConstants";

function ConfigurationImage(props) {
  const [apiConfigurations, setApiConfigurations] = useState(
    ConfigurationStores.getAPIConfiguration()
  );

  useEffect(() => {
    ConfigurationStores.addChangeListener(onApiConfigurationsChange);
    if (apiConfigurations.length === 0) {
      if (!ConfigurationStores.getFullPageLoaderValue())
        configurationAction.fullPageLoaderFlag(true);
      configurationAction.loadAPIConfiguration().then(() => {
        if (ConfigurationStores.getFullPageLoaderValue())
          configurationAction.fullPageLoaderFlag(false);
      });
    }
    return () =>
      ConfigurationStores.removeChangeListner(onApiConfigurationsChange);
  }, [apiConfigurations.length]);

  const onApiConfigurationsChange = () => {
    setApiConfigurations(ConfigurationStores.getAPIConfiguration());
  };

  let path = ConfigurationStores.getBaseURL();

  switch (props.img_type) {
    case apiConstants.IMAGE_TYPE_LOGO:
      path += ConfigurationStores.getLogoSizes()[props.img_size_index];
      break;
    case apiConstants.IMAGE_TYPE_BACKDROP:
      path += ConfigurationStores.getBackdropSizes()[props.img_size_index];
      break;
    case apiConstants.IMAGE_TYPE_POSTER:
      path += ConfigurationStores.getPosterSizes()[props.img_size_index];
      break;
    case apiConstants.IMAGE_TYPE_PROFILE:
      path += ConfigurationStores.getProfileSizes()[props.img_size_index];
      break;
    case apiConstants.IMAGE_TYPE_STILL:
      path += ConfigurationStores.getStillSizes()[props.img_size_index];
      break;
    default:
      path += ConfigurationStores.getStillSizes()[props.img_size_index];
      break;
  }

  return (
    <img src={path + props.path} alt={props.alt} className={props.className} />
  );
}

ConfigurationImage.prototype = {
  path: PropTypes.string.required,
  alt: PropTypes.string.required,
  img_type: PropTypes.string.required,
  img_size_index: PropTypes.number.required,
  className: PropTypes.string,
};

export default ConfigurationImage;
