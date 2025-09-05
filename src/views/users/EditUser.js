import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
import { showSucess, showError } from "utils/toast";
import RoleSelect from "components/Select/RoleSelect";
function EditUser({ isOpen, onClose, user, onUserUpdated }) {
  const [formData, setFormData] = useState({
    accountId: "",
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        accountId: user.accountId || "",

        first_name: user.first_name || "",
        last_name: user.last_name || "",
        mobile: user.mobile || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!user?.accountId) return;

    apiPostSecure(
      apiUrl.updateUsers,
      formData,
      (response) => {
        showSucess("User updated successfully!");
        onUserUpdated();
        onClose();
      },
      (error) => {
        console.log("Update error", error);
        showError(error || "Something went wrong, please try again");
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton color="red.500" />
        <Flex direction="column" w="100%" p="20px">
          <ModalBody>
            {/* Row 1: First + Last Name */}
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  First Name
                </FormLabel>
                <Input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Last Name
                </FormLabel>
                <Input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </FormControl>
            </SimpleGrid>

            {/* Row 2: Mobile + Email */}
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Mobile
                </FormLabel>
                <Input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </FormControl>
            </SimpleGrid>

            {/* Row 3: Role */}
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <RoleSelect
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
              Update
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default EditUser;
