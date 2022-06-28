import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

function EditApplication() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [showapp, setShowallapp] = useState([]);
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);
  const { appname } = useParams();
  const [usergroup, setshowUsergroup] = useState([]);
  const [permit_open, setpermit_open] = useState("");
  const [permit_create, setpermit_create] = useState("");
  const [permit_todolist, setpermit_todolist] = useState("");
  const [permit_Doing, setpermitDoing] = useState("");
  const [permit_Done, setpermitDone] = useState("");
  const navigate = useNavigate();

  const edit_description = () => {
    axios
      .post("/edit_application", {
        app_description: description,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const edit_startdate = () => {
    axios
      .post("/edit_application", {
        app_start_date: startdate,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const edit_enddate = () => {
    axios
      .post("/edit_application", {
        app_end_date: enddate,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const showallapplication = async () => {
    await axios.get(`/showallapplication/${appname}`).then((response) => {
      console.log(response.data);
      setShowallapp(response.data);
    });
  };

  const listUsergroup = async () => {
    await axios.get("/showusergroup").then(
      (response) => {
        setshowUsergroup(response.data);
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const editpermit_open = () => {
    axios
      .post("/edit_permit", {
        appname: appname,
        app_open: permit_open,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const editpermit_create = () => {
    axios
      .post("/edit_permit", {
        appname: appname,
        app_create: permit_create,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const editpermit_todo = () => {
    axios
      .post("/edit_permit", {
        appname: appname,
        app_todo: permit_todolist,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const editpermit_doing = () => {
    axios
      .post("/edit_permit", {
        appname: appname,
        app_doing: permit_Doing,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const editpermit_done = () => {
    axios
      .post("/edit_permit", {
        appname: appname,
        app_done: permit_Done,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const backtoapplication = () => {
    navigate("/application");
  };

  useEffect(() => {
    showallapplication(); // eslint-disable-next-line
    listUsergroup(); // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label>
                <h3>Application:</h3>
              </label>
              <h3>{appname}</h3>
            </div>

            <div className="form-group">
              <label htmlFor="appdescription" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <input
                id="app-description"
                className="form-control"
                type="text"
                placeholder={showapp.App_Description}
                defaultValue={showapp.App_Description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <button
              onClick={edit_description}
              className="py-3 mt-4 btn btn-m btn-success btn-block"
            >
              Edit Description
            </button>
            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <p>{moment(showapp.App_startDate).format("DD-MM-YYYY")}</p>
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>End Date</small>
              </label>
              <p>{moment(showapp.App_endDate).format("DD-MM-YYYY")}</p>
            </div>

            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Edit Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_startDate).format("YYYY-MM-DD")}
                onChange={(event) => {
                  setStartdate(event.target.value);
                }}
              />
            </div>
            <button
              onClick={edit_startdate}
              className="py-3 mt-4 btn btn-success btn-block"
            >
              Edit Start Date
            </button>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>Edit End Date</small>
              </label>
              <input
                id="end-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_endDate).format("YYYY-MM-DD")}
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={edit_enddate}
              className="py-3 mt-4 mb-3 btn btn-m btn-success btn-block"
            >
              Edit End Date
            </button>
            <div>
              <div>
                <label>
                  <h6>Permit Create:</h6>
                </label>
                <select
                  onChange={(event) => {
                    setpermit_create(event.target.value);
                  }}
                >
                  <option value={showapp.App_permit_Create} selected>
                    {showapp.App_permit_Create}
                  </option>
                  {usergroup.map((usergroupinfo, usergroup) => {
                    return (
                      <option key={usergroup}>
                        {usergroupinfo.usergroup_name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={editpermit_create} className="permitbtn ml-2">
                  Edit
                </button>
              </div>
              <div>
                <label>
                  <h6>Permit Open:</h6>
                </label>
                <select
                  onChange={(event) => {
                    setpermit_open(event.target.value);
                  }}
                >
                  <option value={showapp.App_permit_Open} selected>
                    {showapp.App_permit_Open}
                  </option>
                  {usergroup.map((usergroupinfo, usergroup) => {
                    return (
                      <option key={usergroup}>
                        {usergroupinfo.usergroup_name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={editpermit_open} className="permitbtn ml-2">
                  Edit
                </button>
              </div>
              <div>
                <label>
                  <h6>Permit to-do-list:</h6>
                </label>
                <select
                  onChange={(event) => {
                    setpermit_todolist(event.target.value);
                  }}
                >
                  <option value={showapp.App_permit_toDoList}>
                    {showapp.App_permit_toDoList}
                  </option>
                  {usergroup.map((usergroupinfo, usergroup) => {
                    return (
                      <option key={usergroup}>
                        {usergroupinfo.usergroup_name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={editpermit_todo} className="permitbtn ml-2">
                  Edit
                </button>
              </div>
              <div>
                <label>
                  <h6>Permit Doing:</h6>
                </label>
                <select
                  onChange={(event) => {
                    setpermitDoing(event.target.value);
                  }}
                >
                  <option value={showapp.App_permit_Doing}>
                    {showapp.App_permit_Doing}
                  </option>
                  {usergroup.map((usergroupinfo, usergroup) => {
                    return (
                      <option key={usergroup}>
                        {usergroupinfo.usergroup_name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={editpermit_doing} className="permitbtn ml-2">
                  Edit
                </button>
              </div>
              <div>
                <label>
                  <h6>Permit Done:</h6>
                </label>
                <select
                  onChange={(event) => {
                    setpermitDone(event.target.value);
                  }}
                >
                  <option value={showapp.App_permit_Done}>
                    {showapp.App_permit_Done}
                  </option>
                  {usergroup.map((usergroupinfo, usergroup) => {
                    return (
                      <option key={usergroup}>
                        {usergroupinfo.usergroup_name}
                      </option>
                    );
                  })}
                </select>
                <button onClick={editpermit_done} className="permitbtn ml-2">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <button className="button" onClick={backtoapplication}>
          Back
        </button>
      </div>
    </div>
  );
}

export default EditApplication;
