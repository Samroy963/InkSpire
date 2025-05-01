import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext"; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/login', {  // Corrected URL to /login
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // Ensure cookies are included
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    } else {
      alert('Wrong credentials');
    } 
    }catch (err) {
      alert('Login failed. Server might be down.');
      console.error('Login error:', err);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h2 className="signupHeading">Login</h2> <br />
      <input type="text"
        placeholder="username"
        className="signupText"
        value={username} onChange={(ev) => setUsername(ev.target.value)}
      />
      <input type="password"
        placeholder="password"
        className="signupText"
        value={password} onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="signupBtn">Login</button>
    </form>
  );
}




