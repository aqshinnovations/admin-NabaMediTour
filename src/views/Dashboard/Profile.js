// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  useColorMode,
  useColorModeValue,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  FormControl,
  Input,
  FormLabel,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Avatar,
  AvatarGroup,
  Image,
  Link,
  Switch,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import React from "react";
import {
  FaPaypal,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaWallet,
} from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";
import {} from "@chakra-ui/react";
// Custom components
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
// Variables
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";
import { pageVisits, socialTraffic } from "variables/general";
// Chakra imports
import {} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components

import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

function Profile() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

  // Chakra color mode
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mb="24px"
          maxH="330px"
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          backdropFilter="blur(21px)"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="1.5px solid"
          borderColor={borderProfileColor}
          bg={bgProfile}
          p="24px"
          borderRadius="20px"
        >
          <Flex
            align="center"
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}
          >
            <Avatar
              me={{ md: "22px" }}
              src={avatar5}
              w="80px"
              h="80px"
              borderRadius="15px"
            />
            <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight="bold"
                ms={{ sm: "8px", md: "0px" }}
              >
                Alec Thompson
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight="semibold"
              >
                alec@simmmple.com
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
          <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Profile Information
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column">
                <Flex align="center" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Full Name:{" "}
                  </Text>
                  <Text fontSize="md" color="gray.400" fontWeight="400">
                    SHAIKH AAQEEL
                  </Text>
                </Flex>
                <Flex align="center" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Mobile:{" "}
                  </Text>
                  <Text fontSize="md" color="gray.400" fontWeight="400">
                    (+91) 8468849455
                  </Text>
                </Flex>
                <Flex align="center" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Email:{" "}
                  </Text>
                  <Text fontSize="md" color="gray.400" fontWeight="400">
                    aaqil.dev@gmail.com
                  </Text>
                </Flex>
                <Flex align="center" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Company:{" "}
                  </Text>
                  <Text fontSize="md" color="gray.400" fontWeight="400">
                    Indocs Care Medical Service
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Change Password
              </Text>
            </CardHeader>
            <CardBody px="5px">
              {/* <Flex direction='column'>
              <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                ACCOUNT
              </Text>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Email me when someone follows me
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Email me when someone answers on my post
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Email me when someone mentions me
                </Text>
              </Flex>
              <Text
                fontSize='sm'
                color='gray.400'
                fontWeight='600'
                m='6px 0px 20px 0px'>
                APPLICATION
              </Text>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  New launches and projects
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Monthly product changes
                </Text>
              </Flex>
              <Flex align='center' mb='20px'>
                <Switch colorScheme='blue' me='10px' />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Subscribe to newsletter
                </Text>
              </Flex>
            </Flex> */}
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Old Password
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Your old Password"
                  mb="24px"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  New Password
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Your New Password"
                  mb="24px"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Confirm New Password
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Your Confirm new Password"
                  mb="24px"
                  size="lg"
                />

                <Button
                  fontSize="10px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="24px"
                >
                  UPDATE
                </Button>
              </FormControl>
            </CardBody>
          </Card>

          {/* <Card p='16px'>
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Conversations
            </Text>
          </CardHeader>
          <CardBody px='5px'>
            <Flex direction='column' w='100%'>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar2}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Hi! I need more information...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar3}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Awesome work, can you change...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar4}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      Have a great afternoon...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar5}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent='space-between' mb='21px'>
                <Flex align='center'>
                  <Avatar
                    src={avatar6}
                    w='50px'
                    h='50px'
                    borderRadius='15px'
                    me='10px'
                  />
                  <Flex direction='column'>
                    <Text fontSize='sm' color={textColor} fontWeight='bold'>
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize='xs' color='gray.400' fontWeight='400'>
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p='0px' bg='transparent' variant='no-effects'>
                  <Text
                    fontSize='10px'
                    fontWeight='700'
                    color={iconColor}
                    alignSelf='center'>
                    REPLY
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card> */}
        </Grid>
      </Flex>
    </>
  );
}

export default Profile;
