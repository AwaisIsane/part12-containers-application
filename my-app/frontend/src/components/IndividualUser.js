import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IndividualUser = () => {
  const { id } = useParams();

  const userBlogList = useSelector((state) => state.userList);
  const usr = userBlogList.find((user) => user.id === id);
  if (!usr) {
    return null;
  }
  return (
    <>
      <h1>{usr.name}</h1>
      <h3>added Blogs</h3>
      <ul>
        {usr.blogs.map((blg) => (
          <li key={blg.id}>{blg.title}</li>
        ))}
      </ul>
    </>
  );
};

export default IndividualUser;
