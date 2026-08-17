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
  Textarea,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  useColorModeValue,
  useColorMode,
  SimpleGrid,
  Image,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { apiPostSecure, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import RoleSelect from "components/Select/RoleSelect";
import { apiCallPostFormData } from "utils/api";
import { CloseIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const AddBlog = ({ isOpen, onClose, onUserAdded }) => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setAuthor("");
      setContent("");
      setCoverImg(null);
      setPreview(null);
      setLanguage("en");
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setCoverImg(null);
    setPreview(null);
  };

  const handleAddBlog = () => {
    console.log({ title, author, content, coverImg });
    if (!title && !author && !content && !coverImg) {
      showError("All fields are required.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("cover_image", coverImg);
    formData.append("language", language);
    apiCallPostFormData(
      apiUrl.Blogs,
      formData,
      (res) => {
        showSucess("User Added Successfully! 🎉");
        onClose();
        if (onUserAdded) {
          onUserAdded();
        }
      },
      (error) => {
        showError(error || "Something went wrong.Please try again!");
        console.log("error", error);
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Add Blog</ModalHeader>
        <ModalCloseButton color="red.500" />
        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal">
                Title
              </FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal">
                Author
              </FormLabel>
              <Input
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal">
                Language
              </FormLabel>

              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal">
                Content
              </FormLabel>
              <Textarea
                placeholder="Write blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="normal">
                Cover Image
              </FormLabel>

              {!coverImg ? (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImg(e.target.files[0])}
                />
              ) : (
                <Flex direction="column" gap={2}>
                  <Flex align="center" gap={3}>
                    <img
                      src={URL.createObjectURL(coverImg)}
                      alt="preview"
                      style={{
                        width: "120px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => setCoverImg(null)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
              )}
            </FormControl>

            <Flex mt={4} w="100%" justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleAddBlog}>
                Add Blog
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddBlog;
