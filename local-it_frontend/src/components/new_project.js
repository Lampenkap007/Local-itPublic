import React, { useEffect, useState } from "react";
import "./../styles/new_project.scss";
import axios from "axios";
import search from "../img/search.svg";
import x from "../img/x.svg";
import plus from "../img/plus.svg";
import plusWhite from "../img/plusWhite.svg";
import Scrollbars from "react-custom-scrollbars";
const New_project = () => {
  let selectedLanguages = [];
  function filterList() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("addLanguages");
    filter = input.value.toUpperCase();
    ul = document.getElementById("languagesUl");
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

  const [languages, setLanguages] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [contributorEmail, setContributorEmail] = useState("");

  const contributorList = contributors.map((contributor) => (
    <li key={contributor}>
      <a className="contributor">{contributor}</a>
      <img className="removeEmail" src={x} alt="" />
    </li>
  ));

  const getListItems = languages.map(({ attributes, id }, index) => (
    <li key={`${id}-${index}`}>
      <a id={attributes.languageName} className="listItem">
        {attributes.languageName + " - " + attributes.UniCode.toUpperCase()}
      </a>
      <img className="removeLanguage" src={x} alt="" />
      <img className="addLanguage" src={plus} alt="" />
    </li>
  ));

  async function addContributor() {
    if (contributorEmail != "") {
      if (
        contributorEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        document.getElementById("emailNotifier").innerHTML = "";

        setContributors([...contributors, contributorEmail]);
        setContributorEmail("");

        await removeContributor();
      } else {
        document.getElementById("emailNotifier").innerHTML = "Email not valid";
        document.getElementById("contributorEmail").style.borderStyle = "solid";
        document.getElementById("contributorEmail").style.borderWidth = "2px";
        document.getElementById("contributorEmail").style.borderColor = "red";
      }
    }
  }

  function removeContributor() {
    const contributors = document.querySelectorAll(".contributor");
    contributors.forEach(function (e) {
      e.addEventListener("click", function (contributor) {
        contributor.target.parentElement.remove();
      });
    });
  }

  function submit() {
    if (document.getElementById("projectName").value === "") {
      document.getElementById("projectName").style.borderStyle = "solid";
      document.getElementById("projectName").style.borderColor = "red";
      document.getElementById("projectName").style.borderWidth = "2px";
    } else {
      const submitContributors = [];
      const submitLanguages = [];

      document
        .getElementById("addedContributors")
        .querySelectorAll(".contributor")
        .forEach(createSubmitContributors);

      document
        .getElementById("selectedLanguages")
        .querySelectorAll(".listItem")
        .forEach(createSubmitLanguages);

      function createSubmitContributors(item) {
        submitContributors.push(item.innerText);
      }
      function createSubmitLanguages(item) {
        submitLanguages.push(item.id);
      }

      console.log(document.getElementById("projectName").value);
      console.log(submitContributors);
      console.log(submitLanguages);

      const data = {
        data: {
          projectName: document.getElementById("projectName").value,
          languages: submitLanguages,
          contributors: Array.of(parseInt(localStorage.getItem("userId"))),
        },
      };

      let userProjects = JSON.parse(localStorage.getItem("projects"));

      axios
        .post("http://localhost:1337/api/projects", data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        })
        .then(function (response) {
          console.log(response.data.data.id);
          userProjects.push(response.data.data.id);
          const newProjectId = response.data.data.id;
          localStorage.setItem("projects", "[" + userProjects + "]");
          console.log(JSON.parse(localStorage.getItem("projects")));
          const data = {
            projects: JSON.parse(localStorage.getItem("projects")),
          };
          console.log(data);
          axios
            .put(
              "http://localhost:1337/api/users/" +
                localStorage.getItem("userId"),
              data,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
              }
            )
            .then(function (response) {
              console.log(response);
              window.open("/projects/" + newProjectId, "_self");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const fetchLanguages = () =>
    axios
      .get("http://localhost:1337/api/languages", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then(function (response) {
        // handle success
        const fetchedLanguages = response.data.data;
        setLanguages(fetchedLanguages);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  useEffect(async () => {
    await fetchLanguages();
    const listItems = document.querySelectorAll(".listItem");
    listItems.forEach(function (e) {
      e.addEventListener("click", function (listItem) {
        if (listItem.target.parentNode.parentNode.id === "languagesUl") {
          selectedLanguages.push(listItem.target.id);
          document
            .getElementById("selectedLanguages")
            .appendChild(listItem.target.parentElement);
        } else {
          document
            .getElementById("languagesUl")
            .appendChild(listItem.target.parentElement);
        }
      });
    });

    document
      .getElementById("contributorEmail")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("addContributor").click();
        }
      });
  }, []);

  return (
    <div className="newProject">
      <h1 className="newProjectTitle">New project</h1>
      <div className="newProjectSubmit">
        <button onClick={submit}>Create project</button>
      </div>
      <div className="newProjectDevider"></div>
      <div className="newProjectGeneral">
        <p>General</p>
        <div className="newProjectGeneralForm">
          <div className="newProjectGeneralFormProjectName"></div>
          <label htmlFor="projectName">Project name</label>

          <input
            id="projectName"
            className="newProjectGeneralFormProjectNameInput"
            type="text"
            placeholder="Enter name"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="newProjectDevider"></div>
      <div className="newProjectContributors">
        <p>Contributors</p>
        <div className="newProjectContributorsForm">
          <div className="newProjectContributorsFormEmail">
            <label
              className="newProjectContributorsFormLabel"
              htmlFor="contributorEmail"
            >
              Add contributor
            </label>
            <div className="newProjectContributorsFormEmailInputs">
              <p id="emailNotifier"></p>

              <input
                className="newProjectContributorsFormEmailInput"
                id="contributorEmail"
                type="email"
                placeholder="Enter contributors emailadress"
                autoComplete="off"
                value={contributorEmail}
                onChange={({ target: { value } }) => setContributorEmail(value)}
              />
              <ul id="addedContributors">{contributorList}</ul>
              <button
                className="newProjectContributorsFormEmailInputAdd"
                id="addContributor"
                onClick={addContributor}
              >
                <img src={plusWhite} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="newProjectDevider"></div>
      <div className="newProjectLanguages">
        <p>Languages</p>
        <div className="newProjectLanguagesForm">
          <label
            className="newProjectLanguagesFormLabel"
            htmlFor="addLanguages"
          >
            Add languages
          </label>
          <div className="newProjectLanguagesFormFilterList">
            <div className="newProjectLanguagesFormFilterListSearch">
              <input
                className="newProjectLanguagesFormFilterListSearchInput"
                type="text"
                id="addLanguages"
                placeholder="Search languages"
                onKeyUp={filterList}
              />
              <div className="newProjectLanguagesFormFilterListSearchIcon">
                <img src={search} alt="" />
              </div>
            </div>
            <ul
              id="selectedLanguages"
              className="newProjectLanguagesFormLanguagesSelected"
            ></ul>
            <Scrollbars
              style={{
                position: "absolute",
                width: "275px",
                height: "300px",
              }}
            >
              <ul
                className="newProjectLanguagesFormFilterListUl"
                id="languagesUl"
              >
                {getListItems}
              </ul>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_project;
