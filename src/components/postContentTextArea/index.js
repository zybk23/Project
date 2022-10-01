import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddNewAnswer } from "../../store/dataSlice";

import "./styles.scss";

const PostContentTextArea = ({ post }) => {
  const dispatch = useDispatch();
  const [answerValue, setAnswerValue] = useState("");

  const handleChange = (e) => {
    setAnswerValue(e.target.value);
  };
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
  return (
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
  );
};

export default PostContentTextArea;
