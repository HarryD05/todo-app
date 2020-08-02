import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const authenticatedPage = () => {
    const isAdmin = (authContext.user.role === 'admin') ? true : false;

    return (
      <>
        <h3>Welcome, {authContext.user.username}</h3>

        <p>Permissions: {authContext.user.role}</p>

        {
          isAdmin ? <Link to="/admin">
            <div className="highlighted">Admin Page</div>
          </Link> : null
        }
      </>
    )
  }

  const unauthenticatedPage = () => {
    return (
      <>
        <h3>Welcome to my To Do List web application</h3>
        <ol>
          <li>Register an account</li>
          <li>Log in to your account</li>
          <li>Create to do items & get organised!</li>
        </ol>
      </>
    )
  }

  const { isAuthenticated } = authContext;

  return (
    <>
      <h1>Home Page</h1>
      <div className="home-content">
        {isAuthenticated ? authenticatedPage() : unauthenticatedPage()}
      </div>
    </>
  )
}

export default Home;