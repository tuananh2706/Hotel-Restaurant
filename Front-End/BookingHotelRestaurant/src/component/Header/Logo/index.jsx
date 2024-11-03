import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <React.Fragment>
      <Link
        to={"/"}
        className="no-underline text-nowrap font-architectsDaughter text-2xl text-primary"
      >
        My Logo
      </Link>
    </React.Fragment>
  );
}

export default Logo;
