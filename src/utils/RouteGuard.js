import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, layout: Layout,  ...rest }) => {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  }

  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: "/loginAdmin" }} />
        )
      }
    />
  );
};

export default RouteGuard;
