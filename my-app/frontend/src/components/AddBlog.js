import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const AddBlog = ({ toggleFrm }) => {
  const [blogForm, setBlogForm] = useState({ title: "", author: "", url: "" });
  const dispatch = useDispatch();
  const addBlogEvent = (event) => {
    event.preventDefault();
    dispatch(addBlog(blogForm))
      .then((response) => {
        dispatch(
          setNotification({
            message: `a new Blog ${response.title} by ${response.author}`,
            class: "success",
          })
        );
        toggleFrm.current.toggleVisibility();
      })
      .catch((exception) => {
        if (exception.response) {
          const messg = exception.response.data.error
            ? exception.response.data.error
            : "server error";
          dispatch(
            setNotification({
              message: messg,
              class: "error",
            })
          );
        } else {
          dispatch(setNotification({ message: "fail", class: "error" }));
        }
      });
  };

  return (
    <div>
      <form onSubmit={addBlogEvent}>
        <div>
          title
          <input
            type="text"
            value={blogForm.title}
            name="title"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogForm.author}
            name="author"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogForm.url}
            name="url"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, url: target.value })
            }
          />
        </div>
        <Button variant="contained" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};
export default AddBlog;
