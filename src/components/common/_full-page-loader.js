import React, { useState, useEffect } from "react";
import ConfigurationStores from "../../stores/configurationStores";
import logo from "../../assets/logo.svg";

function FullPageLoader(props) {
  const [showLoaderFlag, setShowLoaderFlag] = useState(
    ConfigurationStores.getFullPageLoaderValue()
  );

  useEffect(() => {
    ConfigurationStores.addChangeListener(onShowLoaderFlagChange);
    return () =>
      ConfigurationStores.removeChangeListner(onShowLoaderFlagChange);
  }, [showLoaderFlag]);

  const onShowLoaderFlagChange = () => {
    setShowLoaderFlag(ConfigurationStores.getFullPageLoaderValue());
  };

  let wrapperClass =
    "full-page-loader-conainer p-fixed w-100 h-100 d-flex align-items-center justify-content-center";

  if (ConfigurationStores.getFullPageLoaderValue()) {
    document.getElementById("tmdbAppWrapper").classList.add("loader-active");
  } else if (document.getElementById("tmdbAppWrapper")) {
    document.getElementById("tmdbAppWrapper").classList.remove("loader-active");
  }

  return ConfigurationStores.getFullPageLoaderValue() ? (
    <div className={wrapperClass}>
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
