import React from "react";
import "./styles.scss";

const Navigation = () => {
  return (
    <div className="navContainer">
      <a href="/">Posts</a>
      <a href="/comments">Comments</a>
    </div>
  );
};

export default Navigation;
