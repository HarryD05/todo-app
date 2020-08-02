import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const UnprivateRoute = props => {
  const { component: Component, ...rest } = props;
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route {...rest} render={props => {
      if (isAuthenticated) {
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      } else {
        return <Component {...rest} />
      }
    }} />
  )
}

export default UnprivateRoute;