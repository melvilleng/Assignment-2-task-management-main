import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { usePasswordValidation } from "./password_validation";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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

  const signUpAccount = () => {
    if (
      validLength === true &&
      hasNumber === true &&
      upperCase === true &&
      lowerCase === true &&
      specialChar === true &&
      max_Length === true
    ) {
      Axios.post("/signup", {
        username: username,
        password: password,
        email: email,
      }).then(() => {
        console.log("success");
        alert("success");
        navigate("/signup");
      });
    } else {
      console.log("hello");
      alert("Please meet the Password requirement!!!");
      navigate("/signup");
    }
  };

  return (
    <div onSubmit={SignUp} className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Trelloban</h1>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
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
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                id="email-register"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
                onChange={(event) => {
                  setEmail(event.target.value);
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

            <button
              onClick={signUpAccount}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Sign up for TrelloBan
            </button>
          </form>
        </div>
      </div>
      <div>
        <Link to="/admin" className="btn btn-success">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
