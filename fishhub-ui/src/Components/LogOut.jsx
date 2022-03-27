import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AuthContext from "../Context/Auth";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  async function logOut() {
    await UserService.logout();
    await getLoggedIn();
    setCookie("token", "", {
      path: "/",
    });
    removeCookie("token", { path: "/" });
    navigate("/");
  }

  return <Button onClick={logOut}>Logout</Button>;
}
