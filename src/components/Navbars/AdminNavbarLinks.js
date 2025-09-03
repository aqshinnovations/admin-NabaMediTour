// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { FiLogOut } from "react-icons/fi";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
  ProfileIcon ,
  SettingsIcon,
} from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes/dashRoutes";
import IndocsLogo from "assets/logo.png";
import { useHistory } from "react-router-dom";


export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { colorMode } = useColorMode();
  const history = useHistory();

  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }

  function handleLogout(history) {
  sessionStorage.clear();
  history.push("/auth/signin");
}
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {/* <SearchBar me='18px' /> */}
      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="no-effects"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <FiLogOut  color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <FiLogOut  color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : (
              ""
            )
          }
          onClick={() => handleLogout(history)} 
        >
          <Text display={{ sm: "none", md: "flex" }}>Log Out</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        hamburgerColor={"white"}
        logo={
          <Box display="flex" alignItems="center" justifyContent="center">
            <img
              src={IndocsLogo}
              alt="Indocs"
              style={{ height: "100px", width: "auto" }} // 👈 only control height
            />
          </Box>
        }
        {...rest}
        de={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}
