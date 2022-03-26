import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRrdirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  console.log(user, "this is user");

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
