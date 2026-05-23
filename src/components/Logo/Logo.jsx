import React from "react";
import { Link } from "react-router";

const Logo = ({ size = "w-30" }) => {
  return (
    <div className={`${size} shrink-0`}>
      <Link to="/">
        <div>
          <img
            src="/images/everfast_logo.png"
            className="w-full"
            alt="Ever Fast"
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
