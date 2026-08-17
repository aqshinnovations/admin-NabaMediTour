import React, { useEffect, useState } from "react";
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
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { apiPutSecure, apiUrl } from "utils/api";

const UpdateSpecialties = ({
  isOpen,
  onClose,
  specialty,
  hospitalId,
  onSuccess,
}) => {
  const inputBg = useColorModeValue("white", "gray.700");

  const [formData, setFormData] = useState({
    id: "",
    name_en: "",
    name_ar: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (specialty) {
      setFormData({
        id: specialty.id || "",
        name_en: specialty.name_en || "",
        name_ar: specialty.name_ar || "",
      });
    }
  }, [specialty]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.name_en.trim() || !formData.name_ar.trim()) {
      alert("Please enter specialty name in English and Arabic");
      return;
    }

    setLoading(true);

    const data = {
      id: formData.id,

      name_en: formData.name_en,
      name_ar: formData.name_ar,
    };
    console.log("data", data);
    apiPutSecure(
      apiUrl.Specialty,
      data,
      (response) => {
        console.log("specialty updated:", response);

        setLoading(false);
        onClose();

        if (onSuccess) {
          onSuccess();
        }
      },
      (error) => {
        console.log("Update specialty error:", error);
        setLoading(false);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update specialty</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* English */}
            <FormControl>
              <FormLabel>specialty Name (English)</FormLabel>

              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter specialty name"
                bg={inputBg}
              />
            </FormControl>

            {/* Arabic */}
            <FormControl>
              <FormLabel>Specialties Name (Arabic)</FormLabel>

              <Input
                name="name_ar"
                value={formData.name_ar}
                onChange={handleChange}
                placeholder="أدخل اسم المرفق"
                dir="rtl"
                bg={inputBg}
              />
            </FormControl>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            colorScheme="blue"
            ml={3}
            onClick={handleUpdate}
            isLoading={loading}
          >
            Update specialty
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSpecialties;
