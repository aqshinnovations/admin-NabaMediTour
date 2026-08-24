import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { apiCallPutWithForm, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";

const EditServices = ({ isOpen, onClose, service, onServiceUpdated }) => {
  const bgForm = useColorModeValue("white", "navy.800");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (service && isOpen) {
      setNameEn(service.name_en || "");
      setNameAr(service.name_ar || "");
      setDescriptionEn(service.description_en || "");
      setDescriptionAr(service.description_ar || "");
      setImage(null);
    }
  }, [service, isOpen]);

  const handleUpdateService = () => {
    if (!nameEn || !nameAr || !descriptionEn || !descriptionAr) {
      showError("All fields are required.");
      return;
    }

    const formData = new FormData();

    formData.append("id", service.id);
    formData.append("name_en", nameEn);
    formData.append("name_ar", nameAr);
    formData.append("description_en", descriptionEn);
    formData.append("description_ar", descriptionAr);

    if (image) {
      formData.append("image", image);
    }

    console.log("Update Service FormData:", formData);

    apiCallPutWithForm(
      apiUrl.Services,
      formData,
      (res) => {
        console.log("Service updated:", res);

        showSucess("Service updated successfully! 🎉");

        onClose();

        if (onServiceUpdated) {
          onServiceUpdated();
        }
      },
      (error) => {
        console.log("Update Service Error:", error);

        showError(error || "Something went wrong. Please try again!");
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW="800px" bg={bgForm}>
        <ModalHeader>Edit Service</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            {/* English Name */}
            <FormControl>
              <FormLabel>Service Name (English)</FormLabel>

              <Input
                placeholder="Service name"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </FormControl>

            {/* Arabic Name */}
            <FormControl>
              <FormLabel>Service Name (Arabic)</FormLabel>

              <Input
                placeholder="اسم الخدمة"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
              />
            </FormControl>

            {/* English Description */}
            <FormControl>
              <FormLabel>Description (English)</FormLabel>

              <Textarea
                placeholder="Service description"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                rows={2}
              />
            </FormControl>

            {/* Arabic Description */}
            <FormControl>
              <FormLabel>Description (Arabic)</FormLabel>

              <Textarea
                placeholder="وصف الخدمة"
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                rows={2}
                dir="rtl"
              />
            </FormControl>

            {/* Image */}
            <FormControl>
              <FormLabel>Service Image (optional)</FormLabel>

              {service?.image && !image && (
                <Flex direction="column" gap={3} mb={3}>
                  <img
                    src={service.image}
                    alt={service.name_en}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Flex>
              )}

              {image && (
                <Flex direction="column" gap={3} mb={3}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Flex>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </FormControl>

            {/* Buttons */}
            <Flex mt={4} justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleUpdateService}>
                Update Service
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditServices; // import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Flex,
//   Textarea,
//   FormControl,
//   FormLabel,
//   Input,
//   useColorModeValue,
//   useColorMode,
// } from "@chakra-ui/react";
// import { apiCallPostFormData, apiUrl } from "utils/api";
// import { showError, showSucess } from "utils/toast";
// import { apiCallPutWithForm } from "utils/api";

// const EditServices = ({ isOpen, onClose, blog, onBlogUpdated }) => {
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgForm = useColorModeValue("white", "navy.800");
//   const { colorMode } = useColorMode();

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");
//   const [coverImg, setCoverImg] = useState(null);

//   useEffect(() => {
//     if (blog && isOpen) {
//       setTitle(blog.title || "");
//       setAuthor(blog.author || "");
//       setContent(blog.content || "");
//       setCoverImg(null);
//     }
//   }, [blog, isOpen]);

//   const handleUpdateBlog = () => {
//     if (!title || !author || !content) {
//       showError("All fields are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("id", blog.id);
//     formData.append("title", title);
//     formData.append("author", author);
//     formData.append("content", content);
//     if (coverImg) {
//       formData.append("cover_image", coverImg);
//     }
//     console.log("formData", formData);
//     apiCallPutWithForm(
//       apiUrl.Blogs,
//       formData,
//       (res) => {
//         showSucess("Blog updated successfully! 🎉");
//         onClose();
//         if (onBlogUpdated) {
//           onBlogUpdated();
//         }
//       },
//       (error) => {
//         showError(error || "Something went wrong. Please try again!");
//         console.log("Update error", error);
//       },
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />
//       <ModalContent maxW="800px">
//         <ModalHeader>Edit Blog</ModalHeader>
//         <ModalCloseButton color="red.500" />
//         <ModalBody>
//           <Flex direction="column" w="100%" p="20px" gap={4}>
//             <FormControl>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Author</FormLabel>
//               <Input
//                 placeholder="Author name"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Content</FormLabel>
//               <Textarea
//                 placeholder="Write blog content here..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 rows={10}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Cover Image (optional)</FormLabel>

//               {!coverImg ? (
//                 blog?.cover_image ? (
//                   <Flex direction="column" gap={2}>
//                     <Flex align="center" gap={3}>
//                       <img
//                         src={blog.cover_image}
//                         alt="current cover"
//                         style={{
//                           width: "120px",
//                           height: "80px",
//                           objectFit: "cover",
//                           borderRadius: "8px",
//                         }}
//                       />
//                       <Button
//                         size="sm"
//                         colorScheme="red"
//                         variant="outline"
//                         onClick={() => setCoverImg(null)}
//                       >
//                         Remove
//                       </Button>
//                     </Flex>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setCoverImg(e.target.files[0])}
//                     />
//                   </Flex>
//                 ) : (
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setCoverImg(e.target.files[0])}
//                   />
//                 )
//               ) : (
//                 <Flex direction="column" gap={2}>
//                   <Flex align="center" gap={3}>
//                     <img
//                       src={URL.createObjectURL(coverImg)}
//                       alt="preview"
//                       style={{
//                         width: "120px",
//                         height: "80px",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <Button
//                       size="sm"
//                       colorScheme="red"
//                       variant="outline"
//                       onClick={() => setCoverImg(null)}
//                     >
//                       Remove
//                     </Button>
//                   </Flex>
//                 </Flex>
//               )}
//             </FormControl>

//             <Flex mt={4} justify="flex-end" gap={2}>
//               <Button onClick={onClose}>Cancel</Button>
//               <Button colorScheme="blue" onClick={handleUpdateBlog}>
//                 Update Blog
//               </Button>
//             </Flex>
//           </Flex>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default EditServices;
