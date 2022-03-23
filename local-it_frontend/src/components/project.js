import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Project = () => {
  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/projects", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then(function (response) {
        const projectId = id;
        const projects = response.data.data.filter(
          (project) => project.id === parseInt(projectId)
        );
        document.getElementById("title").innerHTML =
          projects[0].attributes.projectName;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return <h1 id="title"></h1>;
};

export default Project;
