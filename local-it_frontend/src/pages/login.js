import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import "./../styles/login.scss";
import chatImg from "../img/chat.png";
import translatorImg from "../img/language-translator.png";
import eyeOff from "../img/eye-off.svg";
import eye from "../img/eye.svg";

import Google from "../img/google.svg";
import Microsoft from "../img/microsoft.svg";
import Github from "../img/github.svg";

const Login = () => {
  function passwordShow() {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }

  const dataText = [
    "Sign In to",
    "Log In bij",
    "Registrarse en",
    "Connectez vou",
    "Logga in",
  ];

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      document.querySelector("h2").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == "function") {
      setTimeout(fnCallback, 2000);
    }
  }
  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 0);
      return;
    }
    if (i < dataText[i]?.length) {
      typeWriter(dataText[i], 0, function () {
        StartTextAnimation(i + 1);
      });
    }
  }

  if (localStorage.getItem("userId") != null) {
    window.open("/", "_self");
  }

  document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("loginButton").click();
    }
  });

  const imgRef = useRef();
  const textRef = useRef();
  const loginRef = useRef();
  const identifierRef = useRef();
  const passwordRef = useRef();
  function signIn() {
    if (identifierRef.value === null || passwordRef.value === null) {
      document.getElementById("errorText").innerHTML =
        "Please enter your credentials";
    } else {
      axios
        .post("http://localhost:1337/api/auth/local/", {
          identifier: identifierRef.current.value,
          password: passwordRef.current.value,
        })
        .then(function (response) {
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem(
            "projects",
            JSON.stringify(response.data.user.projects)
          );
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("jwt", response.data.jwt);

          window.open("/dashboard", "_self");
        })
        .catch(function (error) {
          console.log(error);
          document.getElementById("errorText").innerHTML =
            "Check your credentials";
        });
    }
  }

  useEffect(() => {
    StartTextAnimation(0);

    gsap.from(imgRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(textRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 0.75,
      ease: "power3.out",
    });
    gsap.from(loginRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="loginPage">
      <div className="loginPageLeft">
        <div className="loginPageLeftImg" ref={imgRef}>
          <img src={translatorImg} className="translatorImg" alt="" />
          <img src={chatImg} className="chatImg" alt="" />
        </div>
        <div className="loginPageLeftText" ref={textRef}>
          <h2>Sign In to </h2>
          <h1>Local it!</h1>
        </div>
      </div>
      <div className="loginPageRight">
        <div className="loginPageRightForm" ref={loginRef}>
          <p id="errorText"></p>
          <input
            type="text"
            className="loginPageRightFormEmail"
            placeholder="Enter email or username"
            ref={identifierRef}
          />
          <div className="loginPageRightFormPasswordContainer">
            <input
              type="password"
              className="loginPageRightFormPassword"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="loginPageRightFormPasswordShow">
              <img onClick={passwordShow} src={eyeOff} alt="" />
            </div>
          </div>
          <div className="recoverPassword">
            <a href="#">Recover password</a>
            <a href="register">No account? Register here!</a>
          </div>

          <button
            onClick={signIn}
            id="loginButton"
            className="loginPageRightFormSignIn"
          >
            Sign In
          </button>

          <div className="loginPageRightFormDevider">
            <div className="loginPageRightFormDeviderLine"></div>
            Or continue with
            <div className="loginPageRightFormDeviderLine"></div>
          </div>
          <div className="loginPageRightFormAuthenticators">
            <div className="loginPageRightFormAuthenticator">
              <img src={Google} alt="" />
            </div>
            <div className="loginPageRightFormAuthenticator">
              <img src={Microsoft} alt="" />
            </div>
            <div className="loginPageRightFormAuthenticator">
              <img src={Github} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
