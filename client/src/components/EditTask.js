import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExampleContext } from "../ExampleContext.js";

function EditIndividualTask() {
  const { usernamestore } = useContext(ExampleContext);
  const [singletask, setSingletask] = useState([]);
  const [task_description, setTaskdescription] = useState("");
  const [listtask_notes, setlistTasknotes] = useState("");
  const [gettask_plan, setgetTaskplan] = useState([]);
  const [task_plan, setTaskplan] = useState("");
  const { taskid } = useParams();
  const navigate = useNavigate();
  const newtaskid = taskid.split("_");
  const [gettaskstate, setTaskstate] = useState("");

  const showindividualtask = async () => {
    await axios.get(`/showsingletask/${taskid}`).then((response) => {
      setSingletask(response.data);
      setTaskstate(response.data.Task_state);
      let listnotes = response.data.Task_notes;
      setlistTasknotes(listnotes);
    });
  };

  const showtaskplan = async () => {
    await axios.get(`/showplan/${newtaskid[0]}`).then((response) => {
      setgetTaskplan(response.data);
    });
  };

  const edittaskdes = async (task_notes, existingdes) => {
    await axios
      .post("/edittask", {
        task_description: task_description,
        taskid: taskid,
        task_owner: usernamestore,
        task_state: gettaskstate,
        task_notes: task_notes,
        existingdes: existingdes,
      })
      .then((response) => {
        console.log(response);
      });
  };
  const edittaskplan = async (task_notes, existingplan) => {
    await axios
      .post("/edittask", {
        task_plan: task_plan,
        taskid: taskid,
        task_owner: usernamestore,
        task_state: gettaskstate,
        task_notes: task_notes,
        existingplan: existingplan,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const goback = () => {
    navigate(`/application/${gettask_plan.Plan_app_Acronym}`);
  };

  useEffect(() => {
    showindividualtask(); //eslint-disable-next-line
    showtaskplan(); //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div id="changeemail" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Task Name</small>
              </label>
              <h2 className="form-control">{singletask.Task_name}</h2>
            </div>

            <div className="form-group">
              <label htmlFor="email-change" className="text-muted mb-1">
                <small>Task Description</small>
              </label>
              <textarea
                id="email-change"
                className="form-control"
                type="text"
                placeholder={singletask.Task_description}
                onChange={(event) => {
                  setTaskdescription(event.target.value);
                }}
              ></textarea>
            </div>
            <button
              onClick={() => {
                edittaskdes(singletask.Task_notes, singletask.Task_description);
              }}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Update Description
            </button>

            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Plan</small>
              </label>
              <select
                onChange={(event) => {
                  setTaskplan(event.target.value);
                }}
                className="form-control"
                defaultValue={" "}
              >
                <option value=" " disabled>
                  Select your Plan
                </option>
                {gettask_plan.map((listtask, keytask) => {
                  return (
                    <option key={keytask}>{listtask.Plan_MVP_name}</option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={() => {
                edittaskplan(singletask.Task_notes, singletask.Task_plan);
              }}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Update Plan
            </button>

            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Notes</small>
              </label>
              <div className="note-box">
                <pre>{listtask_notes}</pre>
              </div>
            </div>
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

export default EditIndividualTask;
