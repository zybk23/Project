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

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postsTemp } = useSelector((state) => state.dataSlice);
  useEffect(() => {
    dispatch(getPosts());
    localStorage.setItem("userId", 1);
  }, []);
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
          title: "soccaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <PostHeader />
      <PostContent posts={postsTemp} />
    </div>
  );
};

export default Posts;
