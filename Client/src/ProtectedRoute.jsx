import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ curRoomId, isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && curRoomId!=="") return <Component {...props} />;
        if (!isAuthenticated)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;