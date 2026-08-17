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
  Textarea,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { apiCallPutWithForm, apiUrl } from "utils/api";

function UpdateProcedure({
  isOpen,
  onClose,
  procedure,
  hospitalId,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    id: "",
    hospital_id: hospitalId || "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!procedure) return;

    setFormData({
      id: procedure.id || "",
      hospital_id: hospitalId || procedure.hospital_id || "",
      name_en: procedure.name_en || "",
      name_ar: procedure.name_ar || "",
      description_en: procedure.description_en || "",
      description_ar: procedure.description_ar || "",
      image: null,
    });

    setPreviewImage(procedure.image || "");
  }, [procedure, hospitalId]);

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
      console.log("Procedure ID is missing");
      return;
    }

    const data = new FormData();

    data.append("id", formData.id);
    data.append("hospital_id", hospitalId);
    data.append("name_en", formData.name_en);
    data.append("name_ar", formData.name_ar);
    data.append("description_en", formData.description_en);
    data.append("description_ar", formData.description_ar);

    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);

    apiCallPutWithForm(
      apiUrl.Procedure,
      data,
      (response) => {
        console.log("Procedure updated:", response);

        setLoading(false);

        if (onSuccess) {
          onSuccess();
        }

        onClose();
      },
      (error) => {
        console.log("Update procedure error:", error);
        setLoading(false);
      },
    );
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  if (!procedure) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Update Procedure</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Procedure Name English</FormLabel>

            <Input
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              placeholder="Enter procedure name"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Procedure Name Arabic</FormLabel>

            <Input
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              placeholder="أدخل اسم الإجراء"
              dir="rtl"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description English</FormLabel>

            <Textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleChange}
              placeholder="Enter procedure description"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description Arabic</FormLabel>

            <Textarea
              name="description_ar"
              value={formData.description_ar}
              onChange={handleChange}
              placeholder="أدخل وصف الإجراء"
              dir="rtl"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Procedure Image</FormLabel>

            {previewImage && (
              <Box mb={3}>
                <Image
                  src={previewImage}
                  alt="Procedure"
                  width="150px"
                  height="100px"
                  objectFit="cover"
                  borderRadius="8px"
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
            Update Procedure
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateProcedure;
