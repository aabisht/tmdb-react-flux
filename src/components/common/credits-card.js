import React from "react";
import PropTypes from "prop-types";
import ConfigurationImage from "./configuration-image";
import apiConstants from "../../api/apiConstants";
import no_cast_male from "../../assets/no-cast-male.jpg";
import no_cast_female from "../../assets/no-cast-female.jpg";
import no_cast_not_specified from "../../assets/no-cast-not-specified.jpg";

function CreditsCard(props) {
  const className = props.className
    ? props.className + " credits-card-wrapper"
    : "credits-card-wrapper";
  const noCast = (gender) => {
    let _noCast;
    switch (gender) {
      case apiConstants.GENDER_MALE:
        _noCast = no_cast_male;
        break;
      case apiConstants.GENDER_FEMALE:
        _noCast = no_cast_female;
        break;
      default:
        _noCast = no_cast_not_specified;
    }

    return _noCast;
  };

  return (
    <div className={className}>
      <div className="img-wrapper mb-2">
        {props.profile_path ? (
          <ConfigurationImage
            path={props.profile_path}
            alt={props.original_name}
            img_type={apiConstants.IMAGE_TYPE_PROFILE}
            img_size_index={1}
          />
        ) : (
          <img src={noCast(props.gender)} alt={props.original_name} />
        )}
      </div>
      <div className="content-wrapper">
        {props.character ? <h2 className="h5">{props.character}</h2> : <></>}
        <h3 className="h6">{props.name}</h3>
        <p>
          <i>
            {props.known_for_department}
            {props.job ? <span>: ({props.job})</span> : <></>}
          </i>
        </p>
      </div>
    </div>
  );
}

CreditsCard.prototype = {
  adult: PropTypes.bool,
  character: PropTypes.string,
  credit_id: PropTypes.string,
  gender: PropTypes.number,
  id: PropTypes.number,
  known_for_department: PropTypes.string,
  job: PropTypes.string,
  name: PropTypes.string,
  order: PropTypes.number,
  original_name: PropTypes.string,
  popularity: PropTypes.number,
  profile_path: PropTypes.string,
};

export default CreditsCard;
