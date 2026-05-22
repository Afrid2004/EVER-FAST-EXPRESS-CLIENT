import React from "react";
import { Link } from "react-router";

const LogoWhite = () => {
  return (
    <div className="w-30">
      <Link to="/">
        <div>
          <img
            src="/images/everfast_logo_white.webp"
            className="w-full"
            alt="Ever Fast"
          />
        </div>
      </Link>
    </div>
  );
};

export default LogoWhite;
