import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(0);
  const [showUsergroup, setshowUsergroup] = useState([]);
  const [addtoUsergroup, setaddtoUsergroup] = useState("");

  const listAll = async () => {
    await axios.get("/showall").then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const disable_account = async (username, status) => {
    setCount(count + 1);
    if (status === "Enable") {
      await axios
        .post("/disable", {
          username: username,
          status: "Disable",
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      await axios
        .post("/disable", {
          username: username,
          status: "Enable",
        })
        .then(
          (response) => {
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
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

  const addusertogroup = async (username) => {
    setCount(count + 1);
    await axios
      .post("/addusergroup", {
        usergroup: addtoUsergroup,
        username: username,
      })
      .then((response) => {
        if (response.data.dup) {
          alert(response.data.dup);
        } else {
          console.log("User Group has been added");
        }
      });
  };

  const removeuserfromgroup = async (username) => {
    setCount(count + 1);
    await axios
      .post("/removeusergroup", {
        usergroup: addtoUsergroup,
        username: username,
      })
      .then((response) => {
        if (response.data.nouser) {
          alert(response.data.nouser);
        } else {
          console.log(response.data.message);
        }
      });
  };

  useEffect(() => {
    listAll();
    listUsergroup();
  }, [count, addtoUsergroup]);

  return (
    <div className="container">
      <div className="table">
        <div className="table-title">
          <div className="row">
            <div className="col-xs-10">
              <h2>Manage Employees</h2>
            </div>
            <div className="col-xs-6">
              <Link to="/signup" className="btn btn-success">
                Create User
              </Link>
            </div>
            <div>
              <Link to="/createusergroup" className="btn btn-success">
                Create User Group
              </Link>
            </div>
            <div>
              <Link to="/listusergroup" className="btn btn-success">
                Show the list of User Group
              </Link>
            </div>
            <div>
              <Link to="/" className="btn btn-success">
                Back to Profile Page
              </Link>
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
              <th>Usergroup</th>
              <th></th>
              <th></th>
              <th>Add/Remove UserGroup</th>
              <th>Status</th>
            </tr>
          </thead>
          {user.map((userinfo, admin_info) => {
            return (
              <tbody key={admin_info}>
                <tr>
                  <td>
                    <span className="custom-checkbox">
                      <label htmlFor="checkbox1"></label>
                    </span>
                  </td>
                  <td>{userinfo.username}</td>
                  <td>{userinfo.email}</td>
                  <td>{userinfo.usergroup}</td>
                  <td>
                    <Link to={`/user/editEmail/${userinfo.username}`}>
                      <button>Edit Email</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/user/editPw/${userinfo.username}`}>
                      <button>Edit Password</button>
                    </Link>
                  </td>

                  <td>
                    <select
                      onChange={(event) => {
                        setaddtoUsergroup(event.target.value);
                      }}
                      defaultValue={" "}
                    >
                      <option value=" " disabled>
                        Select your option
                      </option>
                      {showUsergroup.map((usergroupinfo, usergroup) => {
                        return (
                          <option key={usergroup}>
                            {usergroupinfo.usergroup_name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="UGbutton">
                      <div className="action_UGbtn">
                        <button
                          className="action_UGbtn"
                          onClick={() => {
                            addusertogroup(userinfo.username);
                          }}
                        >
                          Add
                        </button>
                        <button
                          className="action_UGbtn"
                          onClick={() => {
                            removeuserfromgroup(userinfo.username);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  {/* <td>
                    <button
                      onClick={() => {
                        addusertogroup(userinfo.username);
                      }}
                    >
                      Add to UserGroup
                    </button>
                    <button
                      onClick={() => {
                        removeuserfromgroup(userinfo.username);
                      }}
                    >
                      Remove UserGroup
                    </button>
                  </td> */}
                  <td>
                    {userinfo.status}
                    <button
                      onClick={() => {
                        disable_account(userinfo.username, userinfo.status);
                      }}
                    >
                      Enable/Disable
                    </button>
                  </td>
                  <td></td>

                  {/* <td>
                    <button
                      onClick={() => {
                        disable_account(userinfo.username, userinfo.status);
                      }}
                    >
                      Enable/Disable
                    </button>
                  </td> */}

                  <td></td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
