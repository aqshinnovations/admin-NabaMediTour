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
} from "@chakra-ui/react";
import { apiCallPostWithForm, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";

function AddGovtLogo({ isOpen, onClose, hospitalId, onSuccess }) {
  const [formData, setFormData] = useState({
    hospital_id: hospitalId || "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("hospital_id", hospitalId);

    if (formData.image) {
      data.append("images", formData.image);
    }

    setLoading(true);

    apiCallPostWithForm(
      apiUrl.GovtLogo,
      data,
      (response) => {
        console.log("Image added:", response);

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
        console.log("Add image error:", error);

        showError(error || "Something went wrong");

        setLoading(false);
      },
    );
  };

  const handleClose = () => {
    if (loading) return;

    setFormData({
      hospital_id: hospitalId || "",
      image: null,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Images</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Images</FormLabel>

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
            Add Images
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddGovtLogo;
