import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      answers: [],
    });
  });
  return modifiedData;
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
        date: new Date(),
      };
      state.posts[findIndex].answers.push(newAnswerValue);
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
      first.push({ ...action.payload, likeCount: 0, answers: [] });
      state.postsTemp = first;
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
