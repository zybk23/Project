import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/dataSlice";
import { PostHeader, PostContent } from "../../components";
import {
  setTotalLikeCount,
  setTotalCommentCount,
  setPushPost,
  setIsReloadButtonShow,
} from "../../store/dataSlice";
import uuid from "react-uuid";

const Comments = () => {
  const { postsTemp } = useSelector((state) => state.dataSlice);

  let filteredPosts = [];
  useEffect(() => {}, []);
  return <div>Cpommentler</div>;
};

export default Comments;
