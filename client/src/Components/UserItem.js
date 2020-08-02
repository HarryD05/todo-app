import React, { useState } from 'react';
import AuthService from '../Services/AuthService';

const UserItem = props => {
  const { user } = props;
  console.log(user.todos);

  // eslint-disable-next-line
  const [userID, setUserID] = useState(user._id);
  // eslint-disable-next-line
  const [role, setRole] = useState(user.role);
  // eslint-disable-next-line
  const [todos, setTodos] = useState(user.todos);

  const toggle = () => {
    const newRole = (role === 'admin') ? 'user' : 'admin';

    AuthService.changeRole({ _id: userID, role: newRole }).then(data => {
      setRole(data.body.role);
    });
  }

  const reset = () => {
    AuthService.resetUser(user).then(data => {
      if (data.todos === undefined) setTodos([]);
      else setTodos(data.todos);
    })
  }

  return (
    <div className="user-item">
      <div className="info">{user.username}</div>

      <div className="user-stats">
        <div className="role">Role: {role}</div>
        <div className="count">Todos: {todos.length}</div>
      </div>

      <div className="buttons">
        <button type="button" className="user-btn complete-btn" onClick={toggle}>Switch</button>
        <button type="button" className="user-btn delete-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default UserItem;