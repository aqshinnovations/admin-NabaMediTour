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
} from "@chakra-ui/react";

import { apiCallPutWithForm, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";

const EditDoctorsCategory = ({
  isOpen,
  onClose,
  drCategory,
  onServiceUpdated,
}) => {
  const bgForm = useColorModeValue("white", "navy.800");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (drCategory && isOpen) {
      setNameEn(drCategory.name_en || "");
      setNameAr(drCategory.name_ar || "");
      setDescriptionEn(drCategory.description_en || "");
      setDescriptionAr(drCategory.description_ar || "");
      setImage(null);
    }
  }, [drCategory, isOpen]);

  const handleUpdateService = () => {
    if (!nameEn || !nameAr) {
      showError("All fields are required.");
      return;
    }

    const formData = new FormData();

    formData.append("id", drCategory.id);
    formData.append("name_en", nameEn);
    formData.append("name_ar", nameAr);

    console.log("Update DoctorsCategory FormData:", formData);

    apiCallPutWithForm(
      apiUrl.DoctorsCategory,
      formData,
      (res) => {
        console.log("drCategory updated:", res);

        showSucess("DoctorsCategory updated successfully! 🎉");

        onClose();

        if (onServiceUpdated) {
          onServiceUpdated();
        }
      },
      (error) => {
        console.log("Update drCategory Error:", error);

        showError(error || "Something went wrong. Please try again!");
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW="800px" bg={bgForm}>
        <ModalHeader>Doctors Category drCategory</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            {/* English Name */}
            <FormControl>
              <FormLabel>Doctors Category Name (English)</FormLabel>

              <Input
                placeholder="drCategory name"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </FormControl>

            {/* Arabic Name */}
            <FormControl>
              <FormLabel>Doctors Category Name (Arabic)</FormLabel>

              <Input
                placeholder="اسم الخدمة"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
              />
            </FormControl>

            {/* Buttons */}
            <Flex mt={4} justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleUpdateService}>
                Update Doctors Category
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditDoctorsCategory;
