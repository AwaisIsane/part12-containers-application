import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { login } from "../reducers/userReducer";
import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }))
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

  return (
    <Container>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            variant="outlined"
            label="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
