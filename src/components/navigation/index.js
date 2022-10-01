import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Navigation = () => {
  return (
    <div className="navContainer">
      <Link to="/">Posts</Link>
      <Link to="/comments">Comments</Link>
    </div>
  );
};

export default Navigation;
