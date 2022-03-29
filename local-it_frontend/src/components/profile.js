import React from "react";
import "./../styles/profile.scss";

const Profile = () => {
  function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="profile">
      <h1>Profile</h1>

      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Profile;
