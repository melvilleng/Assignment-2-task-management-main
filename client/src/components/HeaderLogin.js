import React, { useContext } from "react";
import { ExampleContext } from "../ExampleContext.js";
import { useNavigate } from "react-router-dom";

function HeaderLogin(props) {
  const { setLoggedIn } = useContext(ExampleContext);
  const navigate = useNavigate();

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("usergroup");
    navigate("/");
  }
  return (
    <header className="header-bar bg-secondary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <a href="/" className="text-white">
            {" "}
            TrelloBan{" "}
          </a>
        </h4>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </header>
  );
}

export default HeaderLogin;
