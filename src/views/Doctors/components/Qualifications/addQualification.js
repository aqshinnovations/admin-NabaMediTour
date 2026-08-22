import React, { useState, useEffect } from "react";
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
import { showError, showSucess } from "utils/toast";

function AddQualification({ isOpen, onClose, doctorId, onSuccess }) {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
  });

  // Reset form every time modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name_en: "",
        name_ar: "",
      });
    }
  }, [isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Hospital ID:", doctorId);
      console.log("Qualifications Data:", formData);

      apiPostSecure(
        apiUrl.qualification,
        {
          doctor_id: doctorId,
          ...formData,
        },
        (response) => {
          onSuccess();
          onClose();
          showSucess("Qualification Added Successfully! 🎉");
        },
        (error) => {
          console.log(error);
          showSucess(error || "Something went wrong");
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
        <ModalHeader>Add Qualifications</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Qualifications Name English</FormLabel>
              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter Qualifications name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Qualifications Name Arabic</FormLabel>
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
            Add Qualifications
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddQualification;
