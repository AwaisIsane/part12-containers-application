import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import Notification from "./Notification";

const Header = () => {
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogList App - {user}
          </Typography>
          <Button color="inherit">
            <Link to={"/users"}>
              <span className="navLink"> Users</span>
            </Link>
          </Button>
          <Button color="inherit">
            <Link to={"/"}>
              <span className="navLink">Blogs</span>
            </Link>
          </Button>
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Notification />
    </>
  );
  // return (
  //   <><nav>
  //       <li><Link to={'/users'}>Users</Link></li>
  //       <li><Link to={'/'}>Blogs</Link></li>
  //   </nav>
  //     <h1>Blogs</h1>
  //     <Notification />
  //     <h2>
  //       youre logged in as {user} <button onClick={logoutUser}>Logout</button>
  //     </h2>
  //   </>
  // );
};

export default Header;
