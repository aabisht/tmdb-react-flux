import React from "react";

function GenreListAllPage(props) {
  return (
    <div className="page-no-banner">
      <h1>
        This is the test of Explore Title related to: {props.match.params.type}-
        {props.match.params.genre}-{props.match.params.genreId}
      </h1>
    </div>
  );
}

export default GenreListAllPage;
