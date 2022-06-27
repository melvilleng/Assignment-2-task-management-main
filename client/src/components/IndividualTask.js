import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function IndividualTask() {
  const [singletask, setSingletask] = useState([]);
  // const [task_name, setTaskname] = useState("");
  // const [task_description, setTaskdescription] = useState("");
  // const [task_notes, setTasknotes] = useState("");
  // const [task_plan, setTaskplan] = useState("");
  // const [task_owner, setTaskowner] = useState("");
  const { taskid } = useParams();
  const navigate = useNavigate();

  const showindividualtask = () => {
    axios.get(`/showsingletask/${taskid}`).then((response) => {
      console.log(response.data);
      setSingletask(response.data);
    });
  };

  const gotoedittask = () => {
    navigate(`/edittask/${taskid}`);
  };
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    showindividualtask(); // eslint-disable-next-line
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
                value={singletask.Task_description}
                // onChange={(event) => {
                //   setChangeEmail(event.target.value);
                // }}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Plan</small>
              </label>
              <h3 className="form-control">{singletask.Task_plan}</h3>
            </div>

            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Notes</small>
              </label>
              <div className="note-box" style={{ fontSize: "13px" }}>
                <pre>{singletask.Task_notes}</pre>
              </div>
            </div>

            {/* <button
              onClick={gotoedittask}
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Edit
            </button> */}
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

export default IndividualTask;
