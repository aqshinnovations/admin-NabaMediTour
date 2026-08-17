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

const UpdateFacility = ({
  isOpen,
  onClose,
  facility,
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
    if (facility) {
      setFormData({
        id: facility.id || "",
        name_en: facility.name_en || "",
        name_ar: facility.name_ar || "",
      });
    }
  }, [facility]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.name_en.trim() || !formData.name_ar.trim()) {
      alert("Please enter facility name in English and Arabic");
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
      apiUrl.Facility,
      data,
      (response) => {
        console.log("Facility updated:", response);

        setLoading(false);
        onClose();

        if (onSuccess) {
          onSuccess();
        }
      },
      (error) => {
        console.log("Update facility error:", error);
        setLoading(false);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Facility</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* English */}
            <FormControl>
              <FormLabel>Facility Name (English)</FormLabel>

              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter facility name"
                bg={inputBg}
              />
            </FormControl>

            {/* Arabic */}
            <FormControl>
              <FormLabel>Facility Name (Arabic)</FormLabel>

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
            Update Facility
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateFacility;
