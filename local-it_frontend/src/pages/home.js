import React from "react";

const Home = () => {
  console.log(localStorage.getItem("username"));
  console.log(localStorage.getItem("userId"));
  console.log(localStorage.getItem("jwt"));

  if (localStorage.getItem("userId") === null) {
    window.open("/login", "_self");
  }

  function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <h1>welcome {localStorage.getItem("username")}</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
