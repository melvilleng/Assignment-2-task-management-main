import React, { useContext, useEffect, useState } from "react";
import { ExampleContext } from "../ExampleContext.js";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function UserDashboard() {
  const [singleProfile, setsingleProfile] = useState([]);
  const { usernamestore } = useContext(ExampleContext);
  const navigate = useNavigate();
  const listone = async () => {
    await axios.post("/showone", { username:usernamestore }).then(
      (response) => {
        console.log(response.data);
        setsingleProfile(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const goback=()=>{
    navigate(-1)
  }

  useEffect(() => {
    listone();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className="table">
        <div className="table-title">
          <div className="row">
            <div className="col-xs-10">
              <h2>{usernamestore} Dashboard</h2>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <span className="custom-checkbox">
                  <label htmlFor="selectAll"></label>
                </span>
              </th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          {singleProfile.map((singleperson) => {
            return (
              <tbody key={singleperson}>
                <tr>
                  <td>
                    <span className="custom-checkbox">
                      <label htmlFor="checkbox1"></label>
                    </span>
                  </td>
                  <td>{singleperson.username}</td>
                  <td>{singleperson.email}</td>
                  <td>
                    <Link to={`/user/editpw/${singleperson.username}`}>
                      <button>Change Password</button>
                    </Link>
                    <Link to={`/user/editEmail/${singleperson.username}`}>
                      <button>Change Email</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div>
      <button className="button" onClick={goback}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
