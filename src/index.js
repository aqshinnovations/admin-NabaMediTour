import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "routes/PrivateRoute";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false}>
    <HashRouter>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/rtl" component={RTLLayout} />

        <PrivateRoute path="/admin" component={AdminLayout} />

        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </HashRouter>

    <ToastContainer position="top-right" autoClose={3000} />
  </ChakraProvider>,
  document.getElementById("root")
);
