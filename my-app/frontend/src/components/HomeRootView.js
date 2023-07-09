import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initialzeBlogs } from "../reducers/blogsReducer";
import AddBlog from "./AddBlog";
import Togglable from "./Togglabble";

const HomeRootView = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialzeBlogs());
  }, []);

  return (
    <>
      <Togglable buttonLabel="addBlog" ref={blogFormRef}>
        <AddBlog toggleFrm={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  );
};

export default HomeRootView;
