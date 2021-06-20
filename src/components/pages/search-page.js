import React from "react";

function SearchPage(props) {
  return <h1>Search Page {props.match.params.slug}</h1>;
}

export default SearchPage;
