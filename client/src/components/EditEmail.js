import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

function UpdateEmail() {
  const [changeemail, setChangeEmail] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();
  console.log(username);

  Axios.defaults.withCredentials = true;
  const editemail = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/update", {
        username: username,
        email: changeemail,
      }).then((response) => {
        console.log(response);
        navigate(-1);
      });
    } catch {
      console.log("ERROR");
    }
  };

  const goback=()=>{
    navigate(-1)
  }

  return (
    <div>
    <div id="changeemail" className="container py-md-5">
      <div className="row align-items-center">
        <form>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <h2>{username}</h2>
          </div>

          <div className="form-group">
            <label htmlFor="email-change" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <input
              id="email-change"
              className="form-control"
              type="text"
              placeholder="Change Email"
              onChange={(event) => {
                setChangeEmail(event.target.value);
              }}
            />
          </div>

          <button
            onClick={editemail}
            className="py-3 mt-4 btn btn-lg btn-success btn-block"
          >
            Change Email
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

export default UpdateEmail;
