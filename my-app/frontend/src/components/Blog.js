import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addComment, likeBlog, removeBlog } from "../reducers/blogsReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const blogList = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.username);
  const blog = blogList.find((blg) => blg.id === id);

  const [newComment, setNewComment] = useState("");
  const [showD, setShowD] = useState(false);

  const likePost = () => {
    const obj = { blogId: blog.id, likes: blog.likes + 1 };
    dispatch(likeBlog(obj)).catch((exception) => {
      exception.response
        ? dispatch(
            setNotification({
              message: exception.response.data.error,
              class: "error",
            })
          )
        : dispatch(
            setNotification({ message: "something went wrong", class: "error" })
          );
    });
  };

  const removeBlogF = () => {
    dispatch(removeBlog(blog.id))
      .then(() => navigate("/"))
      .catch((exception) => {
        dispatch(
          setNotification({
            message: exception.response.data.error,
            class: "error",
          })
        );
      });
  };

  const addCommentEvent = (event) => {
    event.preventDefault();
    dispatch(addComment({ id: blog.id, comment: newComment })).catch(
      (exception) => {
        dispatch(
          setNotification({
            message: exception.response.data.error,
            class: "error",
          })
        );
      }
    );
  };

  const handleDialogClose = () => setShowD(false);
  const openDialog = () => setShowD(true);

  if (!blog) {
    return <>Wrong blog id</>;
  }
  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        Likes:{blog.likes}
        <Button variant="contained" onClick={likePost}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user && (
        <div>
          <Button variant="contained" onClick={openDialog}>
            Remove Blog
          </Button>
        </div>
      )}
      <div>
        <h2>Comments</h2>
        <form onSubmit={addCommentEvent}>
          <div>
            <TextField
              variant="outlined"
              type="text"
              value={newComment}
              name="comment"
              onChange={({ target }) => setNewComment(target.value)}
            />
            <Button variant="contained" type="submit">
              add comment
            </Button>
          </div>
        </form>
        {blog.comments.length === 0 ? (
          <span>no comments</span>
        ) : (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={`${index}${comment}`}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
      <Dialog
        open={showD}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Blog Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            this woll delete blog post along with all comments this action is
            irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Disagree</Button>
          <Button onClick={removeBlogF} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blog;
