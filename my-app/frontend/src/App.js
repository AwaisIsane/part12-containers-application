import { Container } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blog from "./components/Blog";
import Home from "./components/Home";
import HomeRootView from "./components/HomeRootView";
import IndividualUser from "./components/IndividualUser";
import Login from "./components/Login";
import UsersView from "./components/UsersView";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <HomeRootView />,
        },
        {
          path: "/users/",
          element: <UsersView />,
        },
        {
          path: "/users/:id",
          element: <IndividualUser />,
        },
        {
          path: "/blogs/:id",
          element: <Blog />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
