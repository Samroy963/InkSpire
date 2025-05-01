import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./pages/UserContext"; 
import BASE_URL from "./config"; 


export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch(`${BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${BASE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          InkSpire
        </Link>

        <nav>
          {username ? (
            <>
              <span>Hello, {username}</span>
              <Link to="/create" className="btn">
                Create new post
              </Link>
              <a onClick={logout} className="btn">
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn">
                Register
              </Link>
            </>
          )}
        </nav>
      </nav>
    </header>
  );
}
