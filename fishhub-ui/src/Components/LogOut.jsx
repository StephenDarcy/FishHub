import React, { useContext } from "react";
import AuthContext from "../Context/Auth";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";

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

  return (
    <BiLogOut
      style={{ width: 35, height: 35, color: "#77a6f7", marginLeft: 5 }}
      onClick={logOut}
    >
      Logout
    </BiLogOut>
  );
}
