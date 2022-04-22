import React, { useState, useEffect } from "react";
import ConfigurationStores from "../../stores/configurationStores";
import logo from "../../assets/logo.svg";

function FullPageLoader() {
  const [showLoaderFlag, setShowLoaderFlag] = useState(
    ConfigurationStores.getFullPageLoaderValue()
  );

  const onShowLoaderFlagChange = () => {
    setShowLoaderFlag(ConfigurationStores.getFullPageLoaderValue());
  };

  useEffect(() => {
    ConfigurationStores.addChangeListener(onShowLoaderFlagChange);
    return () =>
      ConfigurationStores.removeChangeListner(onShowLoaderFlagChange);
  }, [showLoaderFlag]);

  return showLoaderFlag ? (
    <div className="full-page-loader-conainer p-fixed w-100 h-100 align-items-center justify-content-center loader-active ">
      <div className="loader-item">
        <div className="loader-image">
          <img src={logo} alt="TMDB" />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default FullPageLoader;
