import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';

import AuthService from '../Services/AuthService';
import TodoService from '../Services/TodoService';

import UserItem from '../Components/UserItem';

const Admin = prop => {
  const [userStats, setUserStats] = useState({});
  const [todoStats, setTodoStats] = useState({});
  const [users, setUsers] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    AuthService.userCount().then(data => {
      const { total, admins, users } = data;
      return setUserStats({ total, admins, users });
    });

    AuthService.users().then(data => {
      const { all } = data;
      return setUsers(all);
    });

    TodoService.todoCount().then(data => {
      const { total, archived, completed } = data;
      return setTodoStats({ total, archived, completed });
    });
  }, []);

  const renderTodoStats = () => {
    return (
      <>
        <h3>Todo Stats</h3>


        <div className="todo-total">Total: {todoStats.total}</div>
        <div className="completed-total">Completed: {todoStats.completed}</div>
        <div className="archived-total">Archived: {todoStats.archived}</div>
      </>
    )
  }

  const renderUserStats = () => {
    return (
      <>
        <h3>User Stats</h3>

        <div className="total-total">Total: {userStats.total}</div>
        <div className="admin-total">Admins: {userStats.admins}</div>
        <div className="user-total">Users: {userStats.users}</div>
      </>
    )
  }

  const renderUsers = () => {
    const canRender = (users === undefined) ? false : true;
    return (
      <>
        <h3>Users</h3>

        <div className="user-list">
          {
            canRender ? users.map(user => {
              if (user.username !== authContext.user.username && user.role !== authContext.user.role) {
                return <UserItem key={user._id} user={user} />
              } else {
                return null
              }
            }) : <h3>Loading...</h3>
          }
        </div>
      </>
    )
  }

  return (
    <>
      <h1>Admin Page</h1>

      <div className="todo-stats">{renderTodoStats()}</div>

      <div className="user-stats">{renderUserStats()}</div>

      <div className="users">{renderUsers()}</div>
    </>
  )
}

export default Admin;