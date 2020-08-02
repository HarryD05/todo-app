import React, { useState, useRef, useEffect } from 'react';

import AuthService from '../Services/AuthService';

//Components
import Message from '../Components/Message';

const Register = props => {
  const [user, setUser] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, []);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setUser({ username: "", password: "", role: "user" });
  }

  const onSubmit = e => {
    e.preventDefault();

    AuthService.register(user).then(data => {
      console.log(data);

      const { message } = data;
      setMessage(message);

      resetForm();

      if (!message.msgError) {
        timerID = setTimeout(() => {
          window.location.pathname.replace('/register', '/login');
        }, 2000);
      }
    })
  }

  return (
    <div className="centered-content">
      <form onSubmit={onSubmit}>
        <h3>Please Register</h3>

        <label htmlFor="username" className="">Username</label><br />
        <input type="text" name="username" value={user.username} onChange={onChange} className="" placeholder="Enter username"></input><br />
        <br />
        <label htmlFor="password" className="">Password</label><br />
        <input type="password" name="password" value={user.password} onChange={onChange} className="form-control" placeholder="Enter password"></input><br />

        <input type="text" name="role" value={user.role} hidden readOnly></input>

        <button className="" type="submit">Register</button>
      </form>
      <br />
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register;