import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
function AddSpecialty({ isOpen, onClose, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Hospital ID:", hospitalId);
      console.log("Specialty Data:", formData);

      apiPostSecure(
        apiUrl.Specialty,
        {
          hospital_id: hospitalId,
          ...formData,
        },
        (response) => {
          onSuccess();
          onClose();
        },
        (error) => {
          console.log(error);
        },
      );

      onSuccess?.();
      onClose();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Specialty</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Specialty Name English</FormLabel>
              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter Specialty name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Specialty Name Arabic</FormLabel>
              <Input
                name="name_ar"
                value={formData.name_ar}
                onChange={handleChange}
                placeholder="أدخل اسم المرفق"
              />
            </FormControl>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Specialty
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSpecialty;
