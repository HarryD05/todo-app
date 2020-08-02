import React, { useState, useContext } from 'react';

import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

//Components
import Message from '../Components/Message';

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = e => {
    e.preventDefault();

    AuthService.login(user).then(data => {
      const { isAuthenticated, user, message } = data;

      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        window.location.pathname.replace('/login', '/todos');
      } else {
        setMessage(message);
      }
    })
  }

  return (
    <div className="centered-content">
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>

        <label htmlFor="username" className="">Username</label><br />
        <input type="text" name="username" onChange={onChange} className="" placeholder="Enter username"></input><br />
        <br />
        <label htmlFor="password" className="">Password</label><br />
        <input type="password" name="password" onChange={onChange} className="" placeholder="Enter password"></input><br />

        <button className="" type="submit">Login</button>
      </form>
      <br />
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Login;