import React, { useState } from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function CreateuserGroup() {
  const [createuserGroup, setcreateuserGroup] = useState("");


  const createUsergroupname = () => {
    Axios.post("/createusergroup", {
      usergroup_name: createuserGroup,
    }).then(() => {
      console.log("success");
      alert("success");
    });
  };

  return (
    <div>
    <div id="login" className="container py-md-5">
      <div className="row align-items-center">
        <form>
          <div className="form-group">
            <label
              htmlFor="usergroup_name-register"
              className="text-muted mb-1"
            >
              <small>UserGroup_Name</small>
            </label>
            <input
              id="usergroupname-change"
              className="form-control"
              type="text"
              placeholder="Create New User Group"
              onChange={(event) => {
                setcreateuserGroup(event.target.value);
              }}
            />
          </div>

          <button
            onClick={createUsergroupname}
            className="py-3 mt-4 btn btn-lg btn-success btn-block"
          >
            Create User Group
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

export default CreateuserGroup;
