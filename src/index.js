import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; 
import { ChakraProvider } from "@chakra-ui/react";

// Custom Chakra theme
import theme from "theme/theme.js";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>

    {/* 🔹 Toast container must be inside ReactDOM tree but outside routing */}
    <ToastContainer position="top-right" autoClose={3000} />
  </ChakraProvider>,
  document.getElementById("root")
);
