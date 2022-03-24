import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AuthContext from "../Context/Auth";
import UserService from "../Services/UserService";

export default function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

  async function logOut() {
    await UserService.logout();
    getLoggedIn();
  }

  return <Button onClick={logOut}>Logout</Button>;
}
