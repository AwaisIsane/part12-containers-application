import axios from "axios";
const baseUrl = "/api/blogs";

const getToken = () => JSON.parse(localStorage.getItem("creds"));
const getConfig = () => {
  const token = getToken();
  return {
    headers: { Authorization: `bearer ${token["token"]}` },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postNew = (blog) => {
  const token = getToken();
  const config = getConfig();
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => ({
    ...response.data,
    user: {
      id: response.data.user,
      name: token.name,
      username: token.username,
    },
  }));
};

const likePost = ({ id, likes }) => {
  const config = getConfig();
  const request = axios.put(`${baseUrl}/${id}`, { likes }, config);
  return request.then((response) => response.data);
};

const deletePost = (id) => {
  const config = getConfig();
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const addComment = ({ id, comment }) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment });
  return request.then((response) => response.data);
};

const blogSrv = { getAll, postNew, likePost, deletePost, addComment };
export default blogSrv;
