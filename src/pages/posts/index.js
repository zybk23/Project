import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostHeader, PostContent } from "../../components";
import {
  setTotalLikeCount,
  setTotalCommentCount,
  setPushPost,
  setIsReloadButtonShow,
} from "../../store/dataSlice";
import uuid from "react-uuid";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postsTemp } = useSelector((state) => state.dataSlice);

  useEffect(() => {
    dispatch(setTotalLikeCount());
    dispatch(setTotalCommentCount());
  }, [posts]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (postsTemp.length !== posts.length) {
        dispatch(setIsReloadButtonShow(true));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [posts, postsTemp]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(
        setPushPost({
          userId: 24,
          id: uuid(),
          title: "Taha",
          body: "zeybek",
        })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <PostHeader />
      <PostContent posts={posts} />
    </div>
  );
};

export default Posts;
