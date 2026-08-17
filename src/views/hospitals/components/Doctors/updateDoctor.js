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
  FormControl,
  FormLabel,
  Input,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { apiCallPutWithForm, apiUrl } from "utils/api";

function UpdateDoctor({ isOpen, onClose, doctor, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    hospital_id: "",
    name_en: "",
    name_ar: "",
    specialist_en: "",
    specialist_ar: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doctor) return;

    setFormData({
      id: doctor.id || "",
      hospital_id: hospitalId || doctor.hospital_id || "",
      name_en: doctor.name_en || "",
      name_ar: doctor.name_ar || "",
      specialist_en: doctor.specialist_en || "",
      specialist_ar: doctor.specialist_ar || "",
      image: null,
    });

    setPreviewImage(doctor.image || "");
  }, [doctor, hospitalId]);

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

    if (!formData.id) {
      console.log("Doctor ID is missing");
      return;
    }

    const data = new FormData();

    data.append("id", formData.id);
    data.append("hospital_id", hospitalId);
    data.append("name_en", formData.name_en);
    data.append("name_ar", formData.name_ar);
    data.append("specialist_en", formData.specialist_en);
    data.append("specialist_ar", formData.specialist_ar);

    // Only send image if user selected a new one
    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);

    apiCallPutWithForm(
      apiUrl.hospitalsDoctors,
      data,
      (response) => {
        console.log("Doctor updated successfully:", response);

        setLoading(false);

        if (onSuccess) {
          onSuccess();
        }

        onClose();
      },
      (error) => {
        console.log("Update doctor error:", error);
        setLoading(false);
      },
    );
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  if (!doctor) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Doctor</ModalHeader>

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
                  alt="Doctor"
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
            loadingText="Updating..."
          >
            Update Doctor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateDoctor;
