import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import {isCurrentUserLoggedIn} from "../store/selectors";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const _isCurrentUserLoggedIn = useSelector(isCurrentUserLoggedIn);
  return (
    <Route
      {...rest}
      render={routeProps =>
        _isCurrentUserLoggedIn ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute