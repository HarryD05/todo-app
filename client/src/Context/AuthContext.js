import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

//children is the app component
export default (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? <h1>Loading...</h1> :
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
          {children}
        </AuthContext.Provider>}
    </div>
  )
}