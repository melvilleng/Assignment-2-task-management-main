import React, { useState, useContext } from "react";
import Axios from "axios";
import { ExampleContext } from "../ExampleContext.js";
import { usePasswordValidation } from "./password_validation";

function LogOut() {
  const { setUsername, usernamestore, setLoggedIn } =
    useContext(ExampleContext);
  const [password, setPassword] = useState("");

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
    max_Length,
  ] = usePasswordValidation({
    password: password,
  });

  Axios.defaults.withCredentials = true;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (
        validLength === true &&
        hasNumber === true &&
        upperCase === true &&
        lowerCase === true &&
        specialChar === true &&
        max_Length === true
      ){
      const response = await Axios.post("/login", {
        username: usernamestore,
        password: password,
      });
      if (response.data.message) {
        alert(response.data.message);
      } else {
        localStorage.setItem("username", response.data[0].username);
        setLoggedIn(true);
        await Axios.post("/checkgroup", {
          username: usernamestore,
        }).then((test) => {
          console.log(test.data.isAdmin);
          localStorage.setItem("usergroup", test.data.isAdmin);
        });
      }}else{
        alert("Please fill in the correct Username/Password")
      }
    } catch (event) {
      console.log("There was a problem.");
    }
  }

  return (
    <div id="login" className="container py-md-5">
      <div className="row align-items-center">
        <form>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <input
              id="username-register"
              className="form-control"
              type="text"
              placeholder="Pick a username"
              autoComplete="off"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-register" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input
              id="password-register"
              className="form-control"
              type="password"
              placeholder="Create a password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div>
            <ul>
                <li>
                  Valid Length:{" "}
                  {validLength ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                  Has a Number:{" "}
                  {hasNumber ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                  UpperCase:{" "}
                  {upperCase ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                  LowerCase:{" "}
                  {lowerCase ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                  Special Character:{" "}
                  {specialChar ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                  max_Length:{" "}
                  {max_Length ? <span>True</span> : <span>False</span>}
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="py-3 mt-4 btn btn-lg btn-success btn-block"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogOut;
