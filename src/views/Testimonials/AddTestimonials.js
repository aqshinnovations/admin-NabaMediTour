// import React, { useEffect, useState } from "react";
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
//   Image,
// } from "@chakra-ui/react";

// import { apiCallPostFormData, apiUrl } from "utils/api";
// import { showError, showSucess } from "utils/toast";

// const AddTestimonials = ({ isOpen, onClose, onServiceAdded }) => {
//   const textColor = useColorModeValue("gray.700", "white");

//   const [nameEn, setNameEn] = useState("");
//   const [nameAr, setNameAr] = useState("");
//   const [descriptionEn, setDescriptionEn] = useState("");
//   const [descriptionAr, setDescriptionAr] = useState("");

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Reset form whenever modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       setNameEn("");
//       setNameAr("");
//       setDescriptionEn("");
//       setDescriptionAr("");
//       setImage(null);
//       setPreview(null);
//     }
//   }, [isOpen]);

//   // Image select
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Remove image
//   const removeImage = () => {
//     setImage(null);
//     setPreview(null);
//   };

//   // Add service
//   const handleAddService = () => {
//     // Validate fields
//     if (!image) {
//       showError("All fields are required.");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("image", image);

//     console.log("Service FormData:", {

//       image: image,
//     });

//     apiCallPostFormData(
//       apiUrl.Testimonials,
//       formData,
//       (res) => {
//         console.log("response", res);
//         showSucess(res.msg || "Service Added Successfully! 🎉");

//         onClose();

//         if (onServiceAdded) {
//           onServiceAdded();
//         }
//       },
//       (error) => {
//         console.log("Add Service Error:", error);
//         showError(error || "Something went wrong. Please try again!");
//       },
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />

//       <ModalContent maxW="800px">
//         <ModalHeader>Add Service</ModalHeader>

//         <ModalCloseButton color="red.500" />

//         <ModalBody>
//           <Flex direction="column" w="100%" p="20px" gap={4}>
//             {/* English Name */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
//                 Service Name (English)
//               </FormLabel>

//               <Input
//                 placeholder="Enter service name in English"
//                 value={nameEn}
//                 onChange={(e) => setNameEn(e.target.value)}
//               />
//             </FormControl>

//             {/* Arabic Name */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
//                 Service Name (Arabic)
//               </FormLabel>

//               <Input
//                 placeholder="Enter service name in Arabic"
//                 value={nameAr}
//                 onChange={(e) => setNameAr(e.target.value)}
//                 dir="rtl"
//               />
//             </FormControl>

//             {/* English Description */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
//                 Description (English)
//               </FormLabel>

//               <Textarea
//                 placeholder="Enter service description in English"
//                 value={descriptionEn}
//                 onChange={(e) => setDescriptionEn(e.target.value)}
//                 rows={2}
//               />
//             </FormControl>

//             {/* Arabic Description */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
//                 Description (Arabic)
//               </FormLabel>

//               <Textarea
//                 placeholder="Enter service description in Arabic"
//                 value={descriptionAr}
//                 onChange={(e) => setDescriptionAr(e.target.value)}
//                 rows={2}
//                 dir="rtl"
//               />
//             </FormControl>

//             {/* Image */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
//                 Service Image
//               </FormLabel>

//               {!image ? (
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               ) : (
//                 <Flex direction="column" gap={3}>
//                   {preview && (
//                     <Image
//                       src={preview}
//                       alt="Service preview"
//                       width="160px"
//                       height="100px"
//                       objectFit="cover"
//                       borderRadius="8px"
//                     />
//                   )}

//                   <Button
//                     size="sm"
//                     colorScheme="red"
//                     variant="outline"
//                     width="120px"
//                     onClick={removeImage}
//                   >
//                     Remove
//                   </Button>
//                 </Flex>
//               )}
//             </FormControl>

//             {/* Buttons */}
//             <Flex mt={4} w="100%" justify="flex-end" gap={2}>
//               <Button onClick={onClose}>Cancel</Button>

//               <Button colorScheme="blue" onClick={handleAddService}>
//                 Add Service
//               </Button>
//             </Flex>
//           </Flex>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AddTestimonials;
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
  Image,
} from "@chakra-ui/react";

import { apiCallPostFormData, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";

const AddTestimonials = ({ isOpen, onClose, onTestimonialAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Reset form whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setPreview(null);
    }
  }, [isOpen]);

  // Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // Add testimonial
  const handleAddTestimonial = () => {
    // Validate required fields
    if (!image) {
      showError("All fields are required.");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    console.log("Testimonial FormData:", {
      image: image,
    });

    apiCallPostFormData(
      apiUrl.Testimonials,
      formData,
      (res) => {
        console.log("Testimonial response:", res);

        showSucess(res.msg || "Testimonial Added Successfully! 🎉");

        onClose();

        if (onTestimonialAdded) {
          onTestimonialAdded();
        }
      },
      (error) => {
        console.log("Add Testimonial Error:", error);

        showError(error || "Something went wrong. Please try again!");
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW="800px">
        <ModalHeader>Add Testimonial</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px" gap={4}>
            {/* Testimonial Image */}
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="normal" color={textColor}>
                Testimonial Image
              </FormLabel>

              {!image ? (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              ) : (
                <Flex direction="column" gap={3}>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Testimonial preview"
                      width="160px"
                      height="100px"
                      objectFit="cover"
                      borderRadius="8px"
                    />
                  )}

                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    width="120px"
                    onClick={removeImage}
                  >
                    Remove Image
                  </Button>
                </Flex>
              )}
            </FormControl>

            {/* Buttons */}
            <Flex mt={4} w="100%" justify="flex-end" gap={2}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleAddTestimonial}>
                Add Testimonial
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTestimonials;
