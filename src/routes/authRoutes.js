import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";

const authRoutes = [
  {
    path: "/signin",
    component: SignIn,
    layout: "/auth",
  },
  {
    path: "/signup",
    component: SignUp,
    layout: "/auth",
  },
];

export default authRoutes;
