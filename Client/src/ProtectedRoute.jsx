import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "./Loading"

const ProtectedRoute = ({isLoading, curRoomId, isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && curRoomId!=="") return (isLoading?<Loading />:<Component {...props} />);
        else
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;