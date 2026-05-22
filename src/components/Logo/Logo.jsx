import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="w-30">
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
