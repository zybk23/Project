import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "./styles.scss";

const Comments = () => {
  const { posts } = useSelector((state) => state.dataSlice);
  const [filteredPostData, setFilteredPostData] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const answerList = [];
    posts.forEach((x) => {
      if (x.userId == userId) {
        x.answers.forEach((answer) => {
          answerList.push(answer);
        });
      }
    });
    setFilteredPostData(answerList);
  }, [posts]);
  return (
    <div className="commentContainer">
      <h2>Comment's on {userId}'s</h2>
      {filteredPostData.map((item) => (
        <div className="answers">
          <span>{item.title}</span>
          <span>{moment(item?.date).format("MM-DD-YYYY")}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
