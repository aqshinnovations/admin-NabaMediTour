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
import { showError, showSucess } from "utils/toast";
import { apiPutSecure, apiUrl } from "utils/api";

const UpdateAwards = ({ isOpen, onClose, award, hospitalId, onSuccess }) => {
  const inputBg = useColorModeValue("white", "gray.700");

  const [formData, setFormData] = useState({
    id: "",
    name_en: "",
    name_ar: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (award) {
      setFormData({
        id: award.id || "",
        name_en: award.name_en || "",
        name_ar: award.name_ar || "",
      });
    }
  }, [award]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.name_en.trim() || !formData.name_ar.trim()) {
      alert("Please enter award name in English and Arabic");
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
      apiUrl.doctorAwards,
      data,
      (response) => {
        console.log("award updated:", response);
        showSucess("Awards updated Successfully! 🎉");

        setLoading(false);
        onClose();

        if (onSuccess) {
          onSuccess();
        }
      },
      (error) => {
        console.log("Update award error:", error);
        showSucess("Something went wrong");

        setLoading(false);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update award</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* English */}
            <FormControl>
              <FormLabel>award Name (English)</FormLabel>

              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter award name"
                bg={inputBg}
              />
            </FormControl>

            {/* Arabic */}
            <FormControl>
              <FormLabel>award Name (Arabic)</FormLabel>

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
            Update Awards
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateAwards;
