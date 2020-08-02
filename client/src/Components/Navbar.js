import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

import DarkLogo from '../assets/Dark Logo.png';
import SmallDarkLogo from '../assets/Small Dark Logo.png';

const Navbar = () => {
  //eslint-disable-next-line
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const [isSmall, setIsSmall] = useState((window.visualViewport.width > 700) ? false : true);

  const onResize = () => {
    setIsSmall((window.visualViewport.width > 700) ? false : true);
  }

  window.onresize = onResize;

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  }

  const renderBrand = () => {
    if (isSmall) {
      return (
        <Link to="/">
          <img className="small-brand" src={SmallDarkLogo} alt="CuriousCoder logo"></img>
        </Link>
      )
    } else {
      return (
        <Link to="/">
          <img className="large-brand" src={DarkLogo} alt="CuriousCoder logo"></img>
        </Link>
      )
    }
  }

  const unauthenticatedNavBar = () => {
    return (
      <>
        <div className="centered">
          <Link to="/login">
            <div className="li-item">Login</div>
          </Link>
          {renderBrand()}
          <Link to="/register">
            <div className="li-item">Register</div>
          </Link>
        </div>
      </>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>
        <div className="centered">
          <Link to="/todos">
            <div className="li-item">Todos</div>
          </Link>
          {renderBrand()}
          <div className="logout li-item" onClick={onClickLogoutHandler}>Logout</div>
        </div>
      </>
    )
  }

  return (
    <nav>
      {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
    </nav>
  )
}

export default Navbar;