// // import
// import React, { Component }  from 'react';
// import Dashboard from "views/Dashboard/Dashboard.js";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
// import Profile from "views/Dashboard/Profile.js";
// import SignIn from "views/Pages/SignIn.js";
// import SignUp from "views/Pages/SignUp.js";
// import Patients from "views/Patients/Patients.js"
// import Users from "views/users/Users"
// import {
//   HomeIcon,
//   StatsIcon,
//   CreditIcon,
//   PersonIcon,
//   DocumentIcon,
//   RocketIcon,
//   SupportIcon,
// } from "components/Icons/Icons";

// var dashRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     rtlName: "لوحة القيادة",
//     icon: <HomeIcon color='inherit' />,
//     component: Dashboard,
//     layout: "/admin",
//   },
//   // {
//   //   path: "/tables",
//   //   name: "Tables",
//   //   rtlName: "لوحة القيادة",
//   //   icon: <StatsIcon color='inherit' />,
//   //   component: Tables,
//   //   layout: "/admin",
//   // },
//   // {
//   //   path: "/billing",
//   //   name: "Billing",
//   //   rtlName: "لوحة القيادة",
//   //   icon: <CreditIcon color='inherit' />,
//   //   component: Billing,
//   //   layout: "/admin",
//   // },
//    {
//     path: "/users",
//     name: "users",
//     rtlName: "لوحة القيادة",
//     icon: <StatsIcon color='inherit' />,
//     component: Users,
//     layout: "/admin",
//   },
//    {
//     path: "/patients",
//     name: "patients",
//     rtlName: "لوحة القيادة",
//     icon: <StatsIcon color='inherit' />,
//     component: Patients,
//     layout: "/admin",
//   },
  
//     {
//         path: "/profile",
//         name: "Profile",
//         rtlName: "لوحة القيادة",
//         icon: <PersonIcon color='inherit' />,
//         secondaryNavbar: true,
//         component: Profile,
//         layout: "/admin",
//       },
//       {
//   path: "/signin",
//   component: SignIn,
//   layout: "/auth",
// },

 
// ];
// export default dashRoutes;
import Dashboard from "views/Dashboard/Dashboard.js";
import Profile from "views/Dashboard/Profile.js";
import Patients from "views/Patients/Patients.js";
import Users from "views/users/Users";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
} from "components/Icons/Icons";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: <StatsIcon color='inherit' />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    icon: <StatsIcon color='inherit' />,
    component: Patients,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
];

export default dashRoutes;
