import React from "react";
import { useDispatch } from "react-redux";
import { setLikePost } from "../../store/dataSlice";
import moment from "moment";
import PostContentTextArea from "../postContentTextArea";
import "./styles.scss";

const PostContent = ({ posts }) => {
  const dispatch = useDispatch();

  const handleLikepost = (postId) => {
    dispatch(setLikePost(postId));
  };
  return (
    <div className="postContainer">
      {posts.map((post) => (
        <div key={post.id} className="itemContainer">
          <div className="titleContainer">
            <span>{post?.title}</span>
            <div className="iconContainer">
              <span>{post?.likeCount}</span>
              <img
                onClick={() => handleLikepost(post.id)}
                src={require("../../assets/icons/like.png")}
                alt=""
              />
            </div>
          </div>
          <span className="postBody">{post?.body}</span>
          <PostContentTextArea post={post} />
          <div className="answers">
            {post?.answers.map((answer) => (
              <div key={answer.id} className="answerContainer">
                <span>{answer?.title}</span>
                <span>{moment(answer?.date).format("MM-DD-YYYY")}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostContent;
