import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import RoleSelect from "components/Select/RoleSelect";
const AddUser = ({ isOpen, onClose, onUserAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const { colorMode } = useColorMode();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!isOpen) {
      // Reset all fields when modal closes
      setFirstName("");
      setLastName("");
      setMobile("");
      setEmail("");
      setRole("");
    }
  }, [isOpen]);

  const handleAddUser = () => {
    console.log({ firstName, lastName, mobile, email, role });
    if (!firstName && !lastName && !mobile && !email && !role) {
      showError("All fields are required.");
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      mobile: mobile,
      email: email,
      role: role,
    };

    apiPostSecure(
      apiUrl.Users,
      data,
      (res) => {
        showSucess("User Added Successfully! 🎉");
        onClose();
        if (onUserAdded) {
          onUserAdded();
        }
      },
      (error) => {
        showError(error || "Login failed ");
        console.log("error", error);
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Add New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Flex direction="column" w="100%" p="30px">
            <HStack spacing={4} mb={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  First Name
                </FormLabel>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Last Name
                </FormLabel>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </HStack>

            {/* Row 2: Email & Mobile */}
            <HStack spacing={4} mb={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Mobile
                </FormLabel>
                <Input
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormControl>
            </HStack>

            {/* Row 3: Role */}

            <RoleSelect
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <Flex mt={4} w="50%" ml="auto" justify="flex-end" gap={2}>
              <Button
                fontWeight="bold"
                w="48%"
                h="45px"
                onClick={handleAddUser}
                variant={colorMode === "dark" ? "dark" : "primary"}
              >
                ADD USER
              </Button>

              <Button fontWeight="bold" w="48%" h="45px" onClick={onClose}>
                CLOSE
              </Button>
            </Flex>
          </Flex>
          {/* </Flex> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;
