import React, { useContext, useState, useEffect } from "react";
import { ExampleContext } from "../ExampleContext.js";
import { Link } from "react-router-dom";
import axios from "axios";

function ShowProfile() {
  const [startingprofile, setStartingprofile] = useState([]);
  const { usernamestore } = useContext(ExampleContext);
  const [checkisitadmin, setcheckisitadmin] = useState("");

  const showstartingprofile = async () => {
    await axios.post("/showone", { username: usernamestore }).then(
      (response) => {
        console.log(response.data);
        setStartingprofile(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const checkisadmin = async () => {
    await axios
      .post("/checkgroup", {
        username: usernamestore,
      })
      .then((test) => {
        console.log(test.data.isAdmin);
        setcheckisitadmin(test.data.isAdmin);
      });
  };
  useEffect(() => {
    showstartingprofile();
    checkisadmin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="whoIsWatching">
      <div className="main-div">
        <h1>Welcome</h1>
        <h1>{usernamestore}</h1>
      </div>
      <div className="memberprofileDiv">
        <Link to="/application">
          <button className="addIcon">
            <span>Kaaban</span>
          </button>
        </Link>

        <Link to="/UserProfile">
          <button className="addIcon">
            <span>Edit Profile</span>
          </button>
        </Link>

        {startingprofile.map((show_admin_button) => {
          if (checkisitadmin === true) {
            return (
              <Link key={show_admin_button} to="/admin">
                <button className="addIcon">
                  <span>Admin Use</span>
                </button>
              </Link>
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );
}

export default ShowProfile;
