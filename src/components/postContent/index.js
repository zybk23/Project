import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddNewAnswer, setLikePost } from "../../store/dataSlice";
import moment from "moment";
import "./styles.scss";

const PostContent = ({ posts }) => {
  const dispatch = useDispatch();
  const [answerValue, setAnswerValue] = useState("");
  const handleChangeAnswerValue = (e, id) => {
    if (e.key === "Enter") {
      const obj = {
        value: e.target.value,
        postId: id,
      };
      dispatch(setAddNewAnswer(obj));
      setAnswerValue("");
    }
  };

  const handleChange = (e) => {
    setAnswerValue(e.target.value);
  };

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
          <textarea
            placeholder="Add your comment here"
            className="textArea"
            name=""
            id=""
            cols="40"
            rows="8"
            value={answerValue}
            onChange={handleChange}
            onKeyDown={(e) => handleChangeAnswerValue(e, post.id)}
          />
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
