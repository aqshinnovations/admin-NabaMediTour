// src/views/Blogs/EditBlog.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { apiCallPostFormData, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import { apiCallPutWithForm } from "utils/api";

const EditBlog = ({ isOpen, onClose, blog, onBlogUpdated }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const { colorMode } = useColorMode();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);

  // pre-fill fields when modal opens
  useEffect(() => {
    if (blog && isOpen) {
      setTitle(blog.title || "");
      setAuthor(blog.author || "");
      setContent(blog.content || "");
      setCoverImg(null); // don’t pre-load file input
    }
  }, [blog, isOpen]);

  const handleUpdateBlog = () => {
    if (!title || !author || !content) {
      showError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (coverImg) {
      formData.append("cover_image", coverImg);
    }
console.log("formData",formData)
    apiCallPutWithForm(
      apiUrl.Blogs, // ✅ update endpoint
      formData,
      (res) => {
        showSucess("Blog updated successfully! 🎉");
        onClose();
        if (onBlogUpdated) {
          onBlogUpdated();
        }
      },
      (error) => {
        showError(error || "Something went wrong. Please try again!");
        console.log("Update error", error);
      },
      "PUT" // ✅ use PUT/PATCH for update
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>Edit Blog</ModalHeader>
        <ModalCloseButton color="red.500" />
        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Write blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </FormControl>

           <FormControl>
  <FormLabel>Cover Image (optional)</FormLabel>

  {!coverImg ? (
    blog?.cover_image ? (
      <Flex direction="column" gap={2}>
        <Flex align="center" gap={3}>
          <img
            src={blog.cover_image} // existing image from API
            alt="current cover"
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
            onClick={() => setCoverImg(null)} // remove existing image
          >
            Remove
          </Button>
        </Flex>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImg(e.target.files[0])}
        />
      </Flex>
    ) : (
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImg(e.target.files[0])}
      />
    )
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


            <Flex mt={4} justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleUpdateBlog}>
                Update Blog
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditBlog;
