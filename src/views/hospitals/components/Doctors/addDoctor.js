import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { apiCallPostWithForm, apiUrl } from "utils/api";

function AddDoctor({ isOpen, onClose, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    specialist_en: "",
    specialist_ar: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name_en.trim()) {
      alert("Please enter doctor name in English");
      return;
    }

    if (!formData.name_ar.trim()) {
      alert("Please enter doctor name in Arabic");
      return;
    }

    if (!formData.specialist_en.trim()) {
      alert("Please enter specialist in English");
      return;
    }

    if (!formData.specialist_ar.trim()) {
      alert("Please enter specialist in Arabic");
      return;
    }

    const data = new FormData();

    data.append("hospital_id", hospitalId);
    data.append("name_en", formData.name_en);
    data.append("name_ar", formData.name_ar);
    data.append("specialist_en", formData.specialist_en);
    data.append("specialist_ar", formData.specialist_ar);

    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);

    apiCallPostWithForm(
      apiUrl.hospitalsDoctors,
      data,
      (response) => {
        console.log("Doctor added successfully:", response);

        setLoading(false);

        setFormData({
          name_en: "",
          name_ar: "",
          specialist_en: "",
          specialist_ar: "",
          image: null,
        });

        setPreviewImage("");

        if (onSuccess) {
          onSuccess();
        }

        onClose();
      },
      (error) => {
        console.log("Add doctor error:", error);
        setLoading(false);
      },
    );
  };

  const handleClose = () => {
    if (loading) return;

    setFormData({
      name_en: "",
      name_ar: "",
      specialist_en: "",
      specialist_ar: "",
      image: null,
    });

    setPreviewImage("");

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Doctor</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {/* English Name */}
          <FormControl mb={4} isRequired>
            <FormLabel>Doctor Name English</FormLabel>

            <Input
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              placeholder="Dr. John Smith"
            />
          </FormControl>

          {/* Arabic Name */}
          <FormControl mb={4} isRequired>
            <FormLabel>Doctor Name Arabic</FormLabel>

            <Input
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              placeholder="د. جون سميث"
              dir="rtl"
            />
          </FormControl>

          {/* English Specialist */}
          <FormControl mb={4} isRequired>
            <FormLabel>Specialist English</FormLabel>

            <Input
              name="specialist_en"
              value={formData.specialist_en}
              onChange={handleChange}
              placeholder="Cardiologist"
            />
          </FormControl>

          {/* Arabic Specialist */}
          <FormControl mb={4} isRequired>
            <FormLabel>Specialist Arabic</FormLabel>

            <Input
              name="specialist_ar"
              value={formData.specialist_ar}
              onChange={handleChange}
              placeholder="طبيب قلب"
              dir="rtl"
            />
          </FormControl>

          {/* Image */}
          <FormControl mb={4}>
            <FormLabel>Doctor Image</FormLabel>

            {previewImage && (
              <Box mb={3}>
                <Image
                  src={previewImage}
                  alt="Doctor preview"
                  width="150px"
                  height="120px"
                  objectFit="cover"
                  borderRadius="10px"
                />
              </Box>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              pt="5px"
            />

            {formData.image && (
              <Text mt={2} fontSize="sm">
                Selected: {formData.image.name}
              </Text>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleClose} isDisabled={loading}>
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Adding..."
          >
            Add Doctor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddDoctor;
