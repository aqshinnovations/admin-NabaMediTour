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
  Input,
  useColorModeValue,
  SimpleGrid,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import { CloseIcon } from "@chakra-ui/icons";

const AddHospital = ({ isOpen, onClose, onHospitalAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    location_en: "",
    location_ar: "",
    images: [],
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        location_en: "",
        location_ar: "",
        images: [],
      });
    }
  }, [isOpen]);

  // Handle text fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }
    const MAX_FILE_SIZE = 1024 * 1024; // 1 MB

    // Only allow image files
    const invalidFile = selectedFiles.some(
      (file) => !file.type.startsWith("image/"),
    );

    // Check image size
    const oversizedFile = selectedFiles.find(
      (file) => file.size >= MAX_FILE_SIZE,
    );
    if (invalidFile) {
      showError("Please select only image files");
      e.target.value = "";
      return;
    }

    setFormData((prev) => {
      // Existing + newly selected images
      const combinedFiles = [...prev.images, ...selectedFiles];

      // Remove duplicate files
      const uniqueFiles = combinedFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.name === file.name &&
              f.size === file.size &&
              f.lastModified === file.lastModified,
          ),
      );

      // Maximum 5 images
      if (uniqueFiles.length > 5) {
        showError("You can select maximum 5 images");

        return {
          ...prev,
          images: uniqueFiles.slice(0, 5),
        };
      }

      return {
        ...prev,
        images: uniqueFiles,
      };
    });

    // Clear input so the same input can be selected again
    e.target.value = "";
  };

  // Remove individual image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit hospital
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

    // Add all images
    formData.images.forEach((image) => {
      form.append("images", image);
    });

    // Debug FormData
    form.forEach((value, key) => {
      console.log(key, value);
    });

    apiPostSecure(
      apiUrl.hospitals,
      form,
      (res) => {
        showSucess("Hospital Added Successfully! 🎉");

        onClose();

        if (onHospitalAdded) {
          onHospitalAdded();
        }
      },
      (error) => {
        console.log("error", error);
        showError(error || "Something went wrong");
      },
      true,
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
            {/* ================= IMAGES ================= */}
            <FormControl mt={4} mb={5}>
              <FormLabel>
                Hospital Images
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.500"
                  ml={2}
                >
                  (Maximum 5 images, less than 1 MB each)
                </Text>
              </FormLabel>
              {formData.images.length < 5 && (
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              )}
              {/* Image count */}
              {formData.images.length > 0 && (
                <Text mt={2} fontSize="sm" color="gray.500">
                  {formData.images.length} image
                  {formData.images.length > 1 ? "s" : ""} selected
                </Text>
              )}
              {/* ================= IMAGE PREVIEWS ================= */}
              {formData.images.length > 0 && (
                <SimpleGrid
                  columns={{ base: 2, md: 3, lg: 5 }}
                  spacing={3}
                  mt={4}
                >
                  {formData.images.map((image, index) => (
                    <Box
                      key={`${image.name}-${index}`}
                      position="relative"
                      borderRadius="10px"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Hospital ${index + 1}`}
                        width="100%"
                        height="100px"
                        objectFit="cover"
                      />

                      {/* Remove button */}
                      <IconButton
                        aria-label="Remove image"
                        icon={<CloseIcon />}
                        size="xs"
                        colorScheme="red"
                        position="absolute"
                        top="4px"
                        right="4px"
                        borderRadius="full"
                        onClick={() => removeImage(index)}
                      />

                      {/* Image number */}
                      <Text
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        textAlign="center"
                        fontSize="xs"
                        fontWeight="bold"
                        bg="blackAlpha.600"
                        color="white"
                        py="2px"
                      >
                        Image {index + 1}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </FormControl>

            {/* ================= FORM ================= */}
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
                <FormLabel>English Location</FormLabel>

                <Input
                  name="location_en"
                  value={formData.location_en}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Arabic Location</FormLabel>

                <Input
                  name="location_ar"
                  value={formData.location_ar}
                  onChange={handleChange}
                />
              </FormControl>
            </SimpleGrid>

            {/* ================= BUTTONS ================= */}
            <Flex mt={4} w="50%" ml="auto" justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleAddHospital} ml={3}>
                ADD Hospital
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddHospital;
