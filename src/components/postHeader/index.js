import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsReloadButtonShow,
  setSwitchPostTemp,
} from "../../store/dataSlice";
import "./styles.scss";

const PostHeader = () => {
  const dispatch = useDispatch();
  const { totalLikeCount, totalCommentCount, isReloadButtonShow } = useSelector(
    (state) => state.dataSlice
  );
  const handleClick = () => {
    dispatch(setSwitchPostTemp());
    dispatch(setIsReloadButtonShow(false));
  };
  return (
    <div className="headerContainer">
      {isReloadButtonShow && (
        <button onClick={handleClick} className="headerBtn">
          Reload
        </button>
      )}
      <div className="countContainer">
        <span>Likes: {totalLikeCount}</span>
        <span>Comments: {totalCommentCount} </span>
      </div>
    </div>
  );
};

export default PostHeader;
