import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import { usePasswordValidation } from "./password_validation";

function UpdatePw() {
  const [changepassword, setChangePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { username } = useParams();

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
    max_Length,
  ] = usePasswordValidation({
    password: changepassword,
  });

  Axios.defaults.withCredentials = true;
  const editpw = async (e) => {
    e.preventDefault();
    try {
      if (
        validLength === true &&
        hasNumber === true &&
        upperCase === true &&
        lowerCase === true &&
        specialChar === true &&
        max_Length === true &&
        changepassword === confirmpassword
      ){
        await Axios.post("/update", {
          username: username,
          password: changepassword,
          confirmpassword: confirmpassword,
        }).then((response) => {
          console.log(response);
          navigate(-1);
        });
      } else {
        alert("Password Mismatch or Please Meet the Password Requirement");
      }
    } catch {
      console.log("ERROR");
    }
  };

  const goback=()=>{
    navigate(-1)
  }

  return (
    <div>
    <div id="changepw" className="container py-md-5">
      <div className="row align-items-center">
        <form>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <h2>{username}</h2>
          </div>

          <div className="form-group">
            <label htmlFor="password-change" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input
              id="password-change"
              className="form-control"
              type="password"
              placeholder="Change Password"
              onChange={(event) => {
                setChangePassword(event.target.value);
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
          <div className="form-group">
            <label htmlFor="password-confirm" className="text-muted mb-1">
              <small>Confirm Password</small>
            </label>
            <input
              id="password-confirm"
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          <button
            onClick={editpw}
            className="py-3 mt-4 btn btn-lg btn-success btn-block"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
    <div>
      <button className="button" onClick={goback}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UpdatePw;
