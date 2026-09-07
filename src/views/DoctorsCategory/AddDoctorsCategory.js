import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

import { apiCallPostFormData, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";

const AddDoctorsCategory = ({ isOpen, onClose, onServiceAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Reset form whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setNameEn("");
      setNameAr("");
      setDescriptionEn("");
      setDescriptionAr("");
      setImage(null);
      setPreview(null);
    }
  }, [isOpen]);

  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // Add drCategory
  const handleAddService = () => {
    // Validate fields
    if (!nameEn.trim() || !nameAr.trim()) {
      showError("All fields are required.");
      return;
    }

    const formData = new FormData();

    formData.append("name_en", nameEn);
    formData.append("name_ar", nameAr);

    console.log("ServDoctors Categoryice FormData:", {
      name_en: nameEn,
      name_ar: nameAr,
    });

    apiCallPostFormData(
      apiUrl.DoctorsCategory,
      formData,
      (res) => {
        console.log("response", res);
        showSucess(res.msg || "Doctors Category Added Successfully! 🎉");

        onClose();

        if (onServiceAdded) {
          onServiceAdded();
        }
      },
      (error) => {
        console.log("Add Doctors Category Error:", error);
        showError(error || "Something went wrong. Please try again!");
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW="800px">
        <ModalHeader>Add Doctors Category</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            {/* English Name */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
                Doctors Category Name (English)
              </FormLabel>

              <Input
                placeholder="Enter Doctors Category name in English"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </FormControl>

            {/* Arabic Name */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
                Doctors Category Name (Arabic)
              </FormLabel>

              <Input
                placeholder="Enter Doctors Category name in Arabic"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
              />
            </FormControl>

            {/* Buttons */}
            <Flex mt={4} w="100%" justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleAddService}>
                Add Doctors Category
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddDoctorsCategory;
