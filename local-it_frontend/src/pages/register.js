import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import "./../styles/register.scss";
import chatImg from "../img/chat.png";
import translatorImg from "../img/language-translator.png";
import eyeOff from "../img/eye-off.svg";
import Google from "../img/google.svg";
import Microsoft from "../img/microsoft.svg";
import Github from "../img/github.svg";

const Register = () => {
  function passwordShow() {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }

  function passwordShowconfirm() {
    if (passwordRefConfirm.current.type === "password") {
      passwordRefConfirm.current.type = "text";
    } else {
      passwordRefConfirm.current.type = "password";
    }
  }

  const dataText = [
    "Register at",
    "Registreer bij",
    "Registrati a",
    "Inscrivez-vous",
    "Registrera på",
  ];

  function register() {
    if (
      identifierEmailRef.current.value === "" ||
      identifierUsernameRef.current.value === "" ||
      passwordRef.current.value === "" ||
      passwordRefConfirm.current.value === ""
    ) {
      document.getElementById("errorText").innerHTML =
        "Please enter your credentials";
    } else {
      if (passwordRef.current.value != passwordRefConfirm.current.value) {
        document.getElementById("errorText").innerHTML =
          "Passwords don't match";
      } else {
        axios
          .post("http://localhost:1337/api/users", {
            username: identifierUsernameRef.current.value,
            email: identifierEmailRef.current.value,
            password: passwordRef.current.value,
            confirmed: true,
            blocked: false,
          })
          .then(function (response) {
            window.open("/login", "_self");
          })
          .catch(function (error) {
            console.log(error);
            document.getElementById("errorText").innerHTML = "Register error";
          });
      }
    }
  }

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

  const identifierEmailRef = useRef();
  const identifierUsernameRef = useRef();

  const passwordRef = useRef();
  const passwordRefConfirm = useRef();

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
  });
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
          <div className="loginPageRightFormEmailUsername">
            <input
              type="text"
              className="loginPageRightFormEmail"
              placeholder="Enter email"
              ref={identifierEmailRef}
            />
            <input
              type="text"
              className="loginPageRightFormEmail"
              placeholder="Enter username"
              ref={identifierUsernameRef}
            />
          </div>

          <div className="loginPageRightFormPasswordContainer">
            <input
              type="password"
              className="loginPageRightFormPassword"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="loginPageRightFormPasswordShow">
              <img src={eyeOff} onClick={passwordShow} alt="" />
            </div>
          </div>
          <div className="loginPageRightFormPasswordContainer">
            <input
              type="password"
              className="loginPageRightFormPassword"
              placeholder="Confirm password"
              ref={passwordRefConfirm}
            />
            <div className="loginPageRightFormPasswordShow">
              <img src={eyeOff} onClick={passwordShowconfirm} alt="" />
            </div>
          </div>
          <div className="recoverPassword">
            <a href="login">Already got an account? Sign in here!</a>
          </div>

          <button
            onClick={register}
            id="loginButton"
            className="loginPageRightFormSignIn"
          >
            Register
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

export default Register;
