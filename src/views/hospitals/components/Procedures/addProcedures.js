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

function AddProcedure({ isOpen, onClose, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    hospital_id: hospitalId || "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
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

    if (!formData.name_en.trim()) {
      alert("Please enter procedure name in English");
      return;
    }

    if (!formData.name_ar.trim()) {
      alert("Please enter procedure name in Arabic");
      return;
    }

    const data = new FormData();

    data.append("hospital_id", hospitalId);
    data.append("name_en", formData.name_en);
    data.append("name_ar", formData.name_ar);
    data.append("description_en", formData.description_en);
    data.append("description_ar", formData.description_ar);

    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);

    apiCallPostWithForm(
      apiUrl.Procedure,
      data,
      (response) => {
        console.log("Procedure added:", response);

        setLoading(false);

        setFormData({
          hospital_id: hospitalId || "",
          name_en: "",
          name_ar: "",
          description_en: "",
          description_ar: "",
          image: null,
        });

        if (onSuccess) {
          onSuccess();
        }

        onClose();
      },
      (error) => {
        console.log("Add procedure error:", error);
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
        <ModalHeader>Add Procedure</ModalHeader>

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
            Add Procedure
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProcedure;
