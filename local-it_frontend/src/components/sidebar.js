import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/sidebar.scss";
import settings from "../img/settings.svg";
import user from "../img/user.svg";
import menu from "../img/menu.svg";
import search from "../img/search.svg";
import Scrollbars from "react-custom-scrollbars";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);

  const getListItems = projects.map(({ attributes, id }, index) => (
    <li key={`${id}-${index}`}>
      <a href={"/projects/" + id}>{attributes.projectName}</a>
    </li>
  ));

  const fetchProjects = () =>
    axios
      .get("http://localhost:1337/api/projects", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then(function (response) {
        // handle success
        const projectIds = JSON.parse(localStorage.getItem("projects"));
        const usersProjects = response.data.data.filter((project) =>
          projectIds.includes(project.id)
        );
        setProjects(usersProjects);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  useEffect(async () => {
    await fetchProjects();
  }, []);

  function filterList() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("projectsUl");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div className="sideBar">
      <div className="sideBarTop">
        <div className="sideBarTopHeader">
          <h1>Local it!</h1>
          <img className="sideBarTopHeaderMenu" src={menu} alt="" />
        </div>
        <div className="sideBarTopMenu">
          <div className="sideBarTopMenuDashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-pie-chart"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>{" "}
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="sideBarTopMenuDashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <a href="/new_project">New project</a>
          </div>
        </div>
        <div className="sideBarTopDevider"></div>
        <div className="sideBarTopSearch">
          <input
            className="sideBarTopSearchInput"
            placeholder="Search projects"
            type="text"
            id="searchInput"
            onKeyUp={filterList}
            autoComplete="off"
          />
          <div className="sideBarTopSearchIcon">
            <img className="sideBarTopSearchIconImg" src={search} alt="" />
          </div>
        </div>
        <Scrollbars
          autoHide
          style={{
            position: "absolute",
            bottom: "160px",
            top: "325px",
            width: "300px",
            height: "auto",
          }}
        >
          <ul id="projectsUl">{getListItems}</ul>
        </Scrollbars>
      </div>
      <div className="sideBarBottom">
        <div className="sideBarBottomSettings">
          <img src={settings} alt="" />
          <a href="/settings">Settings</a>
        </div>
        <div className="sideBarBottomProfile">
          <img src={user} alt="" />
          <a href="/profile">{localStorage.getItem("username")}</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
