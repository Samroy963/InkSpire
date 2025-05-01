import {useState} from "react";
import BASE_URL from "../config"; 

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev){
      ev.preventDefault();
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({username,password}),
        headers: {'Content-Type':'application/json'},
      });
      if(response.status==200) {
        alert('registration succesful');
      }else{
        alert('registration failed');
      }
    }


    return (
         <form className="register" onSubmit={register}>
            <h2 className="signupHeading">Register</h2> <br></br>
            <input type="text" 
            placeholder="username" 
            className="signupText" 
            value={username} onChange = {
                ev => setUsername (ev.target.value)}/>
            <input type="password" 
            placeholder="password" 
            className="signupText" 
            value={password} onChange = {
                ev => setPassword (ev.target.value)}/>
            <button className="signupBtn">Register</button>
         </form>
    );
}