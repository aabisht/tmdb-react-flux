import React from "react";

function ProfilePage(props) {
  return <h1>User {props.match.params.slug}</h1>;
}

export default ProfilePage;
