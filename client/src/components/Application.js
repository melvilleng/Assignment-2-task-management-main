import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function Application() {
  const navigate = useNavigate();
  const [showallapp, setShowallapp] = useState([]);

  const createapplication = () => {
    navigate("/create-application");
  };
  const showallapplication = async () => {
    await axios.get("/showallapplication").then((response) => {
      console.log(response.data);
      setShowallapp(response.data);
    });
  };

  useEffect(() => {
    showallapplication();
  }, []);

  return (
    <div className="application-container">
      <div id="create-application-button">
        <button onClick={createapplication}>Create Application</button>
      </div>
      <div className="main-div">
        <h2>List of Application</h2>
      </div>
      {showallapp.map((eachappinfo) => {
        return (
          <div className="memberDiv">
            <div id="my-cards">
              <div className="card-app" id="grocery_card">
                <div className="details">
                  <h3>App Acronym:</h3>
                  <h4>{eachappinfo.App_Acronym}</h4>
                  <h4>Description:</h4>
                  <p>{eachappinfo.App_Description}</p>
                  <h4>Start Date:</h4>
                  <h4>
                    {moment(eachappinfo.App_startDate).format("DD-MM-YYYY")}
                  </h4>

                  <h4>End Date:</h4>
                  <h4>
                    {moment(eachappinfo.App_endDate).format("DD-MM-YYYY")}
                  </h4>
                  <Link to={`/edit-application/${eachappinfo.App_Acronym}`}>
                    <button>Edit Application</button>
                  </Link>
                  <Link to={`/application/${eachappinfo.App_Acronym}`}>
                    <button>Go to Application</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Application;
