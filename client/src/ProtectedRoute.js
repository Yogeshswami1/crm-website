import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useUser } from "./UserContext";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useUser();

  if (loading) {
    return null; // You can also return a loading spinner or placeholder here
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user && roles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;