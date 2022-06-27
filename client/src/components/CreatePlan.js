import React, { useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function CreatePlan() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [plan_mvp_name, setPlanmvpname] = useState("");
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);
  const plan_app_Acronym = useParams();
  const navigate = useNavigate();


  const createNewPlan = () => {
    axios
      .post("/create_plan", {
        plan_mvp_name: plan_mvp_name,
        plan_start_date: startdate,
        plan_end_date: enddate,
        plan_app_Acronym: plan_app_Acronym.appname,
      })
      .then((response) => {
        console.log("success");
        alert(response.data.message);
      });
  };

  const backtokaaban=()=>{
    navigate(`/application/${plan_app_Acronym.appname}`)
  }
  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="app-name-register" className="text-muted mb-1">
                <small>Plan MVP Name</small>
              </label>
              <input
                id="create-application-name"
                className="form-control"
                type="text"
                placeholder="Enter the App Name"
                onChange={(event) => {
                  setPlanmvpname(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                placeholder="Start Date"
                defaultValue={date}
                onChange={(event) => {
                  setStartdate(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>End Date</small>
              </label>
              <input
                id="end-date"
                className="form-control"
                type="date"
                placeholder="End Date"
                defaultValue={date}
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={createNewPlan}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Create New Application
            </button>
          </form>
        </div>
      </div>
      <div>
        <button className="button" onClick={backtokaaban}>
          Back
        </button>
      </div>
    </div>
  );
}

export default CreatePlan;
