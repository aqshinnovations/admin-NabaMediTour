import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  return (
    <Flex position="relative" mb="10px">
      <Flex
        minH={{ md: "720px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="10px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="10px"
          mt={{ base: "10px", md: "20px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(61, 36, 36, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              SIGN IN
            </Text>

            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email/Username
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Your username or email"
                mb="24px"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
              />
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch id="remember-login" colorScheme="blue" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
              >
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Forget Password?
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  href="#"
                  fontWeight="bold"
                >
                  Contact Admin
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgImage={signInImage}
        >
          <Box
            w="100%"
            h="100%"
            bgSize="cover"
            bg="blue.500"
            opacity="0.8"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
