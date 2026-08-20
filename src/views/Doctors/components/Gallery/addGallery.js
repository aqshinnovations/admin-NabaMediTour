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
  Textarea,
} from "@chakra-ui/react";
import { apiCallPostWithForm, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
function addGallery({ isOpen, onClose, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    hospital_id: hospitalId || "",

    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("doctor_id", hospitalId);

    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);

    apiCallPostWithForm(
      apiUrl.Gallery,
      data,
      (response) => {
        console.log("Procedure added:", response);
        showSucess("Image Added Successfully! 🎉");

        setLoading(false);

        setFormData({
          hospital_id: hospitalId || "",

          image: null,
        });

        if (onSuccess) {
          onSuccess();
        }

        onClose();
      },
      (error) => {
        console.log("Add procedure error:", error);
        showSucess(error || "Something went wrong");

        setLoading(false);
      },
    );
  };

  const handleClose = () => {
    if (loading) return;

    setFormData({
      hospital_id: hospitalId || "",
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      image: null,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Gallery</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              pt="5px"
            />
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
            Add Gallery
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default addGallery;
