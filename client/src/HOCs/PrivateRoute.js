import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = props => {
  const { component: Component, roles, ...rest } = props;
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route {...rest} render={props => {
      if (!isAuthenticated) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      } else if (!roles.includes(user.role)) {
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      } else {
        return <Component {...rest} />
      }
    }} />
  )
}

export default PrivateRoute;