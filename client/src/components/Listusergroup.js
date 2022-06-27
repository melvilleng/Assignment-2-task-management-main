import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ShowUsergroup() {
  const [showUsergroup, setshowUsergroup] = useState([]);

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

  const disable_group = async (usergroup, usergroup_status) => {
    console.log(usergroup_status);
    await axios
      .post("/disablegroup", {
        usergroup_name: usergroup,
        usergroup_status: usergroup_status,
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    listUsergroup();
  }, []);

  console.log(showUsergroup);

  return (
    <div className="container">
      <div className="table">
        <div className="table-title">
          <div className="row">
            <div className="col-xs-6"></div>
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
              <th>List of UserGroup</th>
              <th>Status of the UserGroup</th>
            </tr>
          </thead>
          {showUsergroup.map((usergroupinfo, usergroup) => {
            return (
              <tbody key={usergroup}>
                <tr>
                  <td>
                    <span className="custom-checkbox">
                      <label htmlFor="checkbox1"></label>
                    </span>
                  </td>
                  <td>{usergroupinfo.usergroup_name}</td>
                  <td>{usergroupinfo.usergroup_status}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      onClick={() => {
                        disable_group(
                          usergroupinfo.usergroup_name,
                          usergroupinfo.usergroup_status
                        );
                      }}
                    >
                      Disable Group
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div>
      <Link to="/admin" className="btn btn-success">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ShowUsergroup;
