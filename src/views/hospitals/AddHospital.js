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
  SimpleGrid,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import RoleSelect from "components/Select/RoleSelect";
const AddHospital = ({ isOpen, onClose, onHospitalAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const { colorMode } = useColorMode();

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    location_en: "",
    location_ar: "",
    image: null,
  });
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        image: null,
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddHospital = () => {
    if (
      !formData.name_en ||
      !formData.name_ar ||
      !formData.description_en ||
      !formData.description_ar
    ) {
      showError("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name_en", formData.name_en);
    form.append("name_ar", formData.name_ar);
    form.append("description_en", formData.description_en);
    form.append("description_ar", formData.description_ar);
    form.append("location_en", formData.location_en);
    form.append("location_ar", formData.location_ar);

    if (formData.image) {
      form.append("image", formData.image);
    }

    // 🔍 Debug print
    form.forEach((value, key) => {
      console.log(key, value);
    });

    apiPostSecure(
      apiUrl.hospitals,
      form,
      (res) => {
        showSucess("Hospital Added Successfully! 🎉");
        onClose();
        onHospitalAdded && onHospitalAdded();
      },
      (error) => {
        console.log("error", error);
        showError(error || "Something went wrong");
      },
      true, // 👈 multipart flag if needed
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Add New Hospital</ModalHeader>
        <ModalCloseButton color="red.500" />
        <ModalBody>
          <Flex direction="column" w="100%" p="20px">
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
            </FormControl>
            <SimpleGrid columns={2} spacing={4} mb={4}>
              <FormControl>
                <FormLabel>English Name</FormLabel>
                <Input
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arabic Name</FormLabel>
                <Input
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>English Description</FormLabel>
                <Input
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arabic Description</FormLabel>
                <Input
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>English location</FormLabel>
                <Input
                  name="location_en"
                  value={formData.location_en}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arabic location</FormLabel>
                <Input
                  name="location_ar"
                  value={formData.location_ar}
                  onChange={handleChange}
                />
              </FormControl>
            </SimpleGrid>
            <Flex mt={4} w="50%" ml="auto" justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleAddHospital} ml={3}>
                ADD Hospital
              </Button>
            </Flex>
          </Flex>
          {/* </Flex> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddHospital;
