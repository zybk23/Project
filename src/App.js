import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./store/dataSlice";
import { Routes, Route } from "react-router-dom";
import Posts from "./pages/posts";
import Comments from "./pages/comments";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    localStorage.setItem("userId", 1);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/comments" element={<Comments />} />
    </Routes>
  );
};

export default App;
