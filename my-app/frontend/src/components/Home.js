import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../reducers/userReducer";
import loginSrv from "../services/login";
import Header from "./Header";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const creds = loginSrv.getUserFromStorage();
    if (creds) dispatch(setUser(creds));
    else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
};

export default Home;
