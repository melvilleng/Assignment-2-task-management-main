import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ExampleContext } from "../ExampleContext.js";

function CreateTask() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [Rnumber, setRnumber] = useState("");
  const [taskname, setTaskname] = useState("");
  const [createtaskdate, setCreatetaskdate] = useState(date);
  const { usernamestore } = useContext(ExampleContext);
  const [task_description, setTaskdescription] = useState("");
  const plan_app_Acronym = useParams();
  const navigate = useNavigate();

  const getrnumber = async () => {
    await axios
      .get(`/showallapplication/${plan_app_Acronym.appname}`)
      .then((response) => {
        console.log(response.data.App_Rnumber);
        setRnumber(response.data.App_Rnumber);
      });
  };

  const createNewTask = async () => {
    await axios
      .post("/createtask", {
        taskname: taskname,
        task_app_acronym: plan_app_Acronym.appname,
        task_creator: usernamestore,
        task_owner: usernamestore,
        create_date: createtaskdate,
        rnumber: Rnumber,
        task_description: task_description,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const backtokaaban = () => {
    navigate(`/application/${plan_app_Acronym.appname}`);
  };

  useEffect(() => {
    getrnumber(); // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="app-name-register" className="text-muted mb-1">
                <small>Task Name</small>
              </label>
              <input
                id="create-application-name"
                className="form-control"
                type="text"
                placeholder="Enter the App Name"
                onChange={(event) => {
                  setTaskname(event.target.value);
                }}
              />
            </div>

            <h4>Optional</h4>
            <div className="form-group">
              <label htmlFor="description" className="text-muted mb-1">
                <small>Task Description</small>
              </label>

              <textarea
                id="description"
                className="form-control"
                type="text"
                placeholder="Description"
                onChange={(event) => {
                  setTaskdescription(event.target.value);
                }}
              ></textarea>
            </div>

            <button
              onClick={createNewTask}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Create New Task
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

export default CreateTask;
