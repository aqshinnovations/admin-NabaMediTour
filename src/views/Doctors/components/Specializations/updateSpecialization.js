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

const UpdateSpecialization = ({
  isOpen,
  onClose,
  specialization,
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
    if (specialization) {
      setFormData({
        id: specialization.id || "",
        name_en: specialization.name_en || "",
        name_ar: specialization.name_ar || "",
      });
    }
  }, [specialization]);

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
      apiUrl.doctorSpecializations,
      data,
      (response) => {
        console.log("doctorSpecializations updated:", response);
        showSucess("doctorSpecializations updated Successfully! 🎉");

        setLoading(false);
        onClose();

        if (onSuccess) {
          onSuccess();
        }
      },
      (error) => {
        console.log("Update facility error:", error);
        showSucess("Something went wrong");

        setLoading(false);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Specializations</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* English */}
            <FormControl>
              <FormLabel>Specializations Name (English)</FormLabel>

              <Input
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Enter Specializations name"
                bg={inputBg}
              />
            </FormControl>

            {/* Arabic */}
            <FormControl>
              <FormLabel>Specializations Name (Arabic)</FormLabel>

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
            Update Specializations
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSpecialization;
