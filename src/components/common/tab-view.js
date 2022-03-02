import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function TabView(props) {
  const [tabChildren, setTabChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(parseInt(props.activeIndex));

  useEffect(() => {
    if (props.children && props.children.length > 0) {
      let _tabChildren = [];
      props.children.map((item, index) => {
        if (item) {
          return _tabChildren.push(item);
        } else return false;
      });
      setTabChildren(_tabChildren);
    }
  }, [props]);

  const tabViewClass = props.className
    ? "tab-view " + props.className
    : "tab-view";

  const replaceWhiteSpace = (text) => {
    return text.replace(/ /g, "_");
  };

  const handleTabNavClick = (event) => {
    event.stopPropagation();
    setActiveIndex(parseInt(event.currentTarget.getAttribute("tabindex")));
  };

  return tabChildren.length > 0 ? (
    <div className={tabViewClass}>
      <div className="tab-view-nav-container">
        <div className="tab-view-nav-content">
          <ul className="tab-view-nav d-flex list-unstyled" role="tablist">
            {tabChildren.map((item, index) => {
              let activeNavClass =
                (!activeIndex && index === 0) || activeIndex === index
                  ? "tab-view-nav-selected"
                  : "";
              return (
                <li className={activeNavClass} key={index} role="presentation">
                  <button
                    type="button"
                    className="btn tab-view-nav-link"
                    id={"tabViewNav_" + replaceWhiteSpace(item.props?.header)}
                    tabIndex={index}
                    onClick={handleTabNavClick}
                  >
                    {item.props?.header}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="tab-view-panels">
        {tabChildren.map((item, index) => {
          let activeViewClass =
            (!activeIndex && index === 0) || activeIndex === index
              ? "tab-view-panel tab-view-panel-selected"
              : "tab-view-panel";
          return (
            <div
              key={index}
              role="tabpanel"
              className={activeViewClass}
              id={"tabViewPanel_" + replaceWhiteSpace(item.props?.header)}
            >
              {item.props?.children}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}
TabView.propType = {
  activeIndex: PropTypes.number,
};

export default TabView;
