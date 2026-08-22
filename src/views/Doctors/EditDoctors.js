import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { apiCallPutWithForm, apiCallSecureGet, apiUrl } from "utils/api";

import { showSucess, showError } from "utils/toast";

function EditDoctor({ isOpen, onClose, Doctor, onDoctorUpdated }) {
  console.log("Doctor", Doctor);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    category_id: "",
    name_en: "",
    name_ar: "",
    about_en: "",
    about_ar: "",
    experience_en: "",
    experience_ar: "",
    position_en: "",
    position_ar: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  // =========================
  // Get Categories
  // =========================
  useEffect(() => {
    CategoryList();
  }, []);

  const CategoryList = () => {
    apiCallSecureGet(
      apiUrl.Category,
      (response) => {
        console.log("Categories:", response.list);

        setCategories(response.list || []);
      },
      (error) => {
        console.log("Category error:", error);
        setCategories([]);
      },
    );
  };

  // =========================
  // Set Doctor Data
  // =========================
  useEffect(() => {
    if (Doctor) {
      console.log("Selected Doctor:", Doctor);

      setFormData({
        id: Doctor.id || "",
        category_id:
          Doctor.category_id ||
          Doctor.category?.id ||
          Doctor.category?.category_id ||
          "",
        name_en: Doctor.name_en || "",
        name_ar: Doctor.name_ar || "",
        about_en: Doctor.about_en || "",
        about_ar: Doctor.about_ar || "",
        experience_en: Doctor.experience_en || "",
        experience_ar: Doctor.experience_ar || "",
        position_en: Doctor.position_en || "",
        position_ar: Doctor.position_ar || "",
        image: null,
      });

      if (Doctor.image) {
        setImagePreview(
          Doctor.image.startsWith("http")
            ? Doctor.image
            : `${apiUrl.imageBaseUrl}${Doctor.image}`,
        );
      } else {
        setImagePreview("");
      }
    }
  }, [Doctor]);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Handle Image
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =========================
  // Update Doctor
  // =========================
  const handleSubmit = () => {
    if (
      !formData.category_id ||
      !formData.name_en ||
      !formData.name_ar ||
      !formData.about_en ||
      !formData.about_ar ||
      !formData.experience_en ||
      !formData.experience_ar ||
      !formData.position_en ||
      !formData.position_ar
    ) {
      showError("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("id", formData.id);

    form.append("category_id", formData.category_id);

    form.append("name_en", formData.name_en);
    form.append("name_ar", formData.name_ar);

    form.append("about_en", formData.about_en);
    form.append("about_ar", formData.about_ar);

    form.append("experience_en", formData.experience_en);
    form.append("experience_ar", formData.experience_ar);

    form.append("position_en", formData.position_en);
    form.append("position_ar", formData.position_ar);

    // Only send image if user selected a new image
    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    // Debug
    console.log("----- Update Doctor FormData -----");

    form.forEach((value, key) => {
      console.log(key, value);
    });

    apiCallPutWithForm(
      apiUrl.Doctors,
      form,
      (response) => {
        console.log("Doctor updated:", response);

        showSucess("Doctor updated successfully!");

        if (onDoctorUpdated) {
          onDoctorUpdated();
        }

        onClose();
      },
      (error) => {
        console.log("Update error:", error);

        showError(error || "Something went wrong");
      },
      true,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />

      <ModalContent maxW="900px">
        <ModalHeader>Edit Doctor</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px">
            {/* Image */}
            <FormControl mb={5}>
              <FormLabel>Doctor Image</FormLabel>

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

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* English Name */}
              <FormControl>
                <FormLabel>English Name</FormLabel>

                <Input
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic Name */}
              <FormControl>
                <FormLabel>Arabic Name</FormLabel>

                <Input
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
              </FormControl>

              {/* English About */}
              <FormControl>
                <FormLabel>English About</FormLabel>

                <Textarea
                  name="about_en"
                  value={formData.about_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic About */}
              <FormControl>
                <FormLabel>Arabic About</FormLabel>

                <Textarea
                  name="about_ar"
                  value={formData.about_ar}
                  onChange={handleChange}
                />
              </FormControl>

              {/* English Experience */}
              <FormControl>
                <FormLabel>English Experience</FormLabel>

                <Input
                  type="number"
                  name="experience_en"
                  value={formData.experience_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic Experience */}
              <FormControl>
                <FormLabel>Arabic Experience</FormLabel>

                <Input
                  type="number"
                  name="experience_ar"
                  value={formData.experience_ar}
                  onChange={handleChange}
                />
              </FormControl>

              {/* English Position */}
              <FormControl>
                <FormLabel>English Position</FormLabel>

                <Input
                  name="position_en"
                  value={formData.position_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic Position */}
              <FormControl>
                <FormLabel>Arabic Position</FormLabel>

                <Input
                  name="position_ar"
                  value={formData.position_ar}
                  onChange={handleChange}
                />
              </FormControl>
              {/* Category */}
              <FormControl>
                <FormLabel>Category</FormLabel>

                <Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  placeholder="Select Category"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_en}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>

          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Update Doctor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditDoctor;
