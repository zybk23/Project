import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import uuid from "react-uuid";

export const getPosts = createAsyncThunk("data/getPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const { data } = response;
  const modifiedData = [];
  data.forEach((x) => {
    modifiedData.push({
      ...x,
      likeCount: 0,
      createdDate: moment(new Date()).unix(),
      answers: [],
    });
  });
  const sortedData = modifiedData.sort((a, b) => {
    return b.createdDate - a.createdDate;
  });
  return sortedData;
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    posts: [],
    postsTemp: [],
    totalLikeCount: 0,
    totalCommentCount: 0,
    isReloadButtonShow: false,
  },
  reducers: {
    setAddNewAnswer: (state, action) => {
      const { value, postId } = action.payload;
      const findIndex = state.posts.findIndex((x) => x.id === postId);
      const newAnswerValue = {
        id: uuid(),
        title: value,
        date: moment(new Date()).unix(),
      };
      const currentAnswers = [...state.posts[findIndex].answers];
      currentAnswers.push(newAnswerValue);
      const sortedAnswers = currentAnswers.sort((a, b) => {
        return b.date - a.date;
      });
      state.posts[findIndex].answers = sortedAnswers;
    },
    setLikePost: (state, action) => {
      const postId = action.payload;
      const findIndex = state.posts.findIndex((x) => x.id === postId);
      state.posts[findIndex].likeCount += 1;
    },
    setTotalLikeCount: (state, action) => {
      let totalLike = 0;
      state.posts.forEach((x) => {
        totalLike += x.likeCount;
      });
      state.totalLikeCount = totalLike;
    },
    setTotalCommentCount: (state, action) => {
      let totalComment = 0;
      state.posts.forEach((x) => {
        totalComment += x.answers.length;
      });
      state.totalCommentCount = totalComment;
    },
    setPushPost: (state, action) => {
      const first = [...state.posts];
      first.push({
        ...action.payload,
        createdDate: moment(new Date()).unix(),
        likeCount: 0,
        answers: [],
      });
      const sortedFirst = first.sort((a, b) => {
        return b.createdDate - a.createdDate;
      });
      state.postsTemp = sortedFirst;
    },
    setIsReloadButtonShow: (state, action) => {
      state.isReloadButtonShow = action.payload;
    },
    setSwitchPostTemp: (state, action) => {
      state.posts = state.postsTemp;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postsTemp = action.payload;
    },
  },
});

export const {
  setAddNewAnswer,
  setLikePost,
  setTotalLikeCount,
  setTotalCommentCount,
  setPushPost,
  setIsReloadButtonShow,
  setSwitchPostTemp,
} = dataSlice.actions;

export default dataSlice.reducer;
