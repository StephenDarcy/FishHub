/* eslint-disable react/prop-types */
import React, { useEffect, useState, createContext } from "react";
import UserService from "../Services/UserService";

const AuthContext = createContext(false);

function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const response = await UserService.loggedIn();
    setLoggedIn(response.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { Auth };
