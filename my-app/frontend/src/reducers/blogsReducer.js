import { createSlice } from "@reduxjs/toolkit";
import blogSrv from "../services/blogs";
import { sortByLikes } from "../utils";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlogSuccess(state, action) {
      const blg = action.payload;
      return [...state, blg];
    },
    removeBlogSuccess(state, action) {
      return state.filter((bl) => bl.id !== action.payload);
    },
    likeBlogSuccess(state, action) {
      return state
        .map((bl) =>
          bl.id === action.payload.id
            ? { ...bl, likes: action.payload.likes }
            : bl
        )
        .sort(sortByLikes);
    },
    addCommentSuccess(state, action) {
      return state.map((bl) =>
        bl.id === action.payload.id
          ? { ...bl, comments: action.payload.comments }
          : bl
      );
    },
  },
});

export const initialzeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogSrv.getAll();
    blogs = blogs.sort(sortByLikes);
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const blogResponse = await blogSrv.postNew(blog);
    dispatch(addBlogSuccess(blogResponse));
    return blogResponse;
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogSrv.deletePost(blogId);
    dispatch(removeBlogSuccess(blogId));
  };
};

export const likeBlog = ({ blogId, likes }) => {
  return async (dispatch) => {
    const response = await blogSrv.likePost({ id: blogId, likes });
    dispatch(likeBlogSuccess({ likes: response.likes, id: response.id }));
  };
};

export const addComment = ({ id, comment }) => {
  return async (dispatch) => {
    const response = await blogSrv.addComment({ id, comment });
    dispatch(addCommentSuccess(response));
  };
};

export const {
  setBlogs,
  addBlogSuccess,
  removeBlogSuccess,
  likeBlogSuccess,
  addCommentSuccess,
} = blogsSlice.actions;
export default blogsSlice.reducer;
