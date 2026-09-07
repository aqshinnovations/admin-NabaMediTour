import Dashboard from "views/Dashboard/Dashboard.js";
import Profile from "views/Profile/Profile";
import Patients from "views/Patients/Patients.js";
import Users from "views/users/Users";
import Blogs from "views/Blogs/blogs";
import Hospitals from "views/hospitals/Index";
import HospitalDetails from "views/hospitals/HospitalDetails";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  CreativeTimLogo,
} from "components/Icons/Icons";
import { FaQuoteLeft } from "react-icons/fa";
import Doctors from "views/Doctors/Index";
import DoctorsDetails from "views/Doctors/DoctorsDetails";
import { FaHospital, FaUserMd } from "react-icons/fa";
import Services from "views/Services/Services";
import Testimonials from "views/Testimonials/Testimonials";
import DoctorsCategory from "views/DoctorsCategory/DoctorsCategory";
const dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: <HomeIcon color="inherit" />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/hospital",
    name: "Hospital",
    icon: <FaHospital color="inherit" />,
    component: Hospitals,
    layout: "/admin",
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <FaUserMd color="inherit" />,
    component: Doctors,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    icon: <PersonIcon color="inherit" />,
    component: Patients,
    layout: "/admin",
  },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: <PersonIcon color="inherit" />,
  //   component: Users,
  //   layout: "/admin",
  // },

  {
    path: "/blogs",
    name: "blogs",
    icon: <DocumentIcon color="inherit" />,
    secondaryNavbar: true,
    component: Blogs,
    layout: "/admin",
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   icon: <PersonIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: Profile,
  //   layout: "/admin",
  // },
  {
    path: "/hospitalDetail",
    name: "Hospital Details",
    component: HospitalDetails,
    layout: "/admin",
    hidden: true,
  },

  {
    path: "/doctorDetail/:id",
    name: "Doctor Details",
    component: DoctorsDetails,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/services",
    name: "services",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Services,
    layout: "/admin",
  },
  {
    path: "/testimonials",
    name: "testimonials",
    icon: <FaQuoteLeft color="inherit" />,
    secondaryNavbar: true,
    component: Testimonials,
    layout: "/admin",
  },
  {
    path: "/DoctorsCategory",
    name: "DoctorsCategory",
    icon: <CreativeTimLogo color="inherit" />,
    secondaryNavbar: true,
    component: DoctorsCategory,
    layout: "/admin",
  },
];

export default dashRoutes;
