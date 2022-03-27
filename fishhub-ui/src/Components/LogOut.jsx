import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AuthContext from "../Context/Auth";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    await UserService.logout();
    await getLoggedIn();
    navigate("/");
  }

  return <Button onClick={logOut}>Logout</Button>;
}
