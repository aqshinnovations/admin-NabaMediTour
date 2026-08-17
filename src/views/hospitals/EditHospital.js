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
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { apiCallPutWithForm, apiUrl } from "utils/api";
import { showSucess, showError } from "utils/toast";
import RoleSelect from "components/Select/RoleSelect";
function EditHospital({ isOpen, onClose, Hospital, onHospitalUpdated }) {
  console.log("Hospital", Hospital);
  const [formData, setFormData] = useState({
    id: "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (Hospital) {
      setFormData({
        id: Hospital.id || "",
        name_en: Hospital.name_en || "",
        name_ar: Hospital.name_ar || "",
        description_en: Hospital.description_en || "",
        description_ar: Hospital.description_ar || "",
        image: Hospital.image,
      });
      if (Hospital.image) {
        setImagePreview(
          Hospital.image.startsWith("http")
            ? Hospital.image
            : `${apiUrl.imageBaseUrl}${Hospital.image}`,
        );
      } else {
        setImagePreview("");
      }
    }
  }, [Hospital]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Save selected File
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Show selected image immediately
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = () => {
    const form = new FormData();

    form.append("id", formData.id);
    form.append("name_en", formData.name_en);
    form.append("name_ar", formData.name_ar);
    form.append("description_en", formData.description_en);
    form.append("description_ar", formData.description_ar);

    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }
    console.log("---- FormData ----");
    form.forEach((value, key) => {
      console.log(key, value);
    });
    apiCallPutWithForm(
      apiUrl.hospitals,
      form,
      (response) => {
        showSucess("Hospital updated successfully!");
        onHospitalUpdated();
        onClose();
      },
      (error) => {
        console.log("Update error", error);
        showError(error || "Something went wrong");
      },
      true,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Edit Hospital</ModalHeader>
        <ModalCloseButton color="red.500" />
        <Flex direction="column" w="100%" p="20px">
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Hospital Image</FormLabel>

              {imagePreview && (
                <Box mb={4}>
                  <Image
                    src={imagePreview}
                    alt={formData.name_en}
                    width="200px"
                    height="130px"
                    objectFit="cover"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor="gray.200"
                  />
                </Box>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
            {/* Row 1: First + Last Name */}

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

export default EditHospital;
