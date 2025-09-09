import Dashboard from "views/Dashboard/Dashboard.js";
import Profile from "views/Profile/Profile";
import Patients from "views/Patients/Patients.js";
import Users from "views/users/Users";
import Blogs from "views/Blogs/blogs";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,   // for Blogs
} from "components/Icons/Icons";
const dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: <HomeIcon color="inherit" />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Users",
    icon: <PersonIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    icon: <PersonIcon color="inherit" />,
    component: Patients,
    layout: "/admin",
  },
  {
    path: "/blogs",
    name: "blogs",
    icon: <DocumentIcon color="inherit" />,
    secondaryNavbar: true,
    component: Blogs,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
];

export default dashRoutes;
