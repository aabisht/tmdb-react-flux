import React from "react";

function SearchPage(props) {
  return <h1>Explore Title related to: {props.match.params.slug}</h1>;
}

export default SearchPage;
