import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import moment from "moment";

function EditPlan() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);
  const plan_name = useParams();
  const [showplanname,setShowPlanname] = useState([])
  const navigate = useNavigate();

  const showoneplan = async () => {
    await axios.get(`/showoneplan/${plan_name.planname}`).then((response) => {
      console.log(response.data);
      setShowPlanname(response.data[0]);
    });
  };

//   const EditPlanname = () => {
//     axios
//       .post("/edit_plan", {
//         plan_mvp_name: plan_mvp_name,
//         // plan_app_Acronym: plan_app_Acronym.appname,
//       })
//       .then((response) => {
//         console.log("success");
//         alert(response.data.message);
//       });
//   };

  const EditPlanstartdate = () => {
    axios
      .post("/edit_plan", {
        plan_start_date: startdate,
        plan_mvp_name: plan_name.planname,
        
      })
      .then((response) => {
        alert(response.data.message);
      });
  };

  const EditPlanenddate = () => {
    axios
      .post("/edit_plan", {
        plan_end_date: enddate,
        plan_mvp_name: plan_name.planname,
        
      })
      .then((response) => {
        console.log("success");
        alert(response.data.message);
      });
  };

  const backtokaaban=()=>{
    navigate(`/application/${showplanname.Plan_app_Acronym}`)
  }

  useEffect(() => {
    showoneplan(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="app-name-register" className="text-muted mb-1">
                <small>Plan MVP Name</small>
              </label>
              <h3>{showplanname.Plan_MVP_name}</h3>
              {/* <input
                id="create-application-name"
                className="form-control"
                type="text"
                placeholder={showplanname.Plan_MVP_name}
                onChange={(event) => {
                  setPlanmvpname(event.target.value);
                }}
              /> */}
            </div>
            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
              <small>Plan Start Date:</small>
              <h4>{moment(showplanname.Plan_startDate).format("DD-MM-YYYY")}</h4>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Edit Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                onChange={(event) => {
                  setStartdate(event.target.value);
                }}
              />
            </div>
            <button
              onClick={EditPlanstartdate}
              className="py-3 mt-4 btn btn-success btn-block"
            >
              Edit Start Date
            </button>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted mt-2">
              <small>Plan End Date:</small>
              <h4>{moment(showplanname.Plan_endDate).format("DD-MM-YYYY")}</h4>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted">
                <small>Edit End Date</small>
              </label>
              <input
                id="end-date"
                className="form-control"
                type="date"
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={EditPlanenddate}
              className="py-3 mt-2 btn btn-success btn-block"
            >
              Edit End Date
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

export default EditPlan;
