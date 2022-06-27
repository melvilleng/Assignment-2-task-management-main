import React from "react";

function Header(props) {
  return (
    <header className="header-bar bg-secondary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <a href="/" className="text-white">
            {" "}
            TrelloBan{" "}
          </a>
        </h4>
      </div>
    </header>
  );
}

export default Header;
