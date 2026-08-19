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
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

import { apiPostSecure, apiUrl } from "utils/api";
import { showError, showSucess } from "utils/toast";
import { apiCallSecureGet } from "utils/api";

const AddDoctors = ({ isOpen, onClose, onDoctorAdded }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    name_ar: "",
    name_en: "",
    about_ar: "",
    about_en: "",
    experience_ar: "",
    experience_en: "",
    position_ar: "",
    position_en: "",
    image: [],
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        category_id: "",
        name_ar: "",
        name_en: "",
        about_ar: "",
        about_en: "",
        experience_ar: "",
        experience_en: "",
        position_ar: "",
        position_en: "",
        image: [],
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    setFormData((prev) => ({
      ...prev,
      image: files,
    }));
  };

  useEffect(() => {
    CategoryList();
  }, []);

  const CategoryList = () => {
    apiCallSecureGet(
      apiUrl.Category,
      (response) => {
        console.log("Category", response.list);
        setCategories(response.list || []);
      },
      (error) => {
        console.log("error", error);
        setCategories([]);
      },
    );
  };

  const handleAddDoctor = () => {
    if (
      !formData.category_id ||
      !formData.name_ar ||
      !formData.name_en ||
      !formData.about_ar ||
      !formData.about_en ||
      !formData.experience_ar ||
      !formData.experience_en ||
      !formData.position_ar ||
      !formData.position_en
    ) {
      showError("All fields are required");
      return;
    }

    const form = new FormData();

    // Category
    form.append("category_id", formData.category_id);

    // Names
    form.append("name_ar", formData.name_ar);
    form.append("name_en", formData.name_en);

    // About
    form.append("about_ar", formData.about_ar);
    form.append("about_en", formData.about_en);

    // Experience
    form.append("experience_ar", formData.experience_ar);
    form.append("experience_en", formData.experience_en);

    // Position
    form.append("position_ar", formData.position_ar);
    form.append("position_en", formData.position_en);

    // Images
    formData.image.forEach((file) => {
      form.append("image", file);
    });

    // Debug FormData
    console.log("----- Doctor FormData -----");

    form.forEach((value, key) => {
      console.log(key, value);
    });

    apiPostSecure(
      apiUrl.Doctors,
      form,
      (res) => {
        console.log("Doctor Added:", res);

        showSucess("Doctor Added Successfully! 🎉");

        onClose();

        if (onDoctorAdded) {
          onDoctorAdded();
        }
      },
      (error) => {
        console.log("Doctor Add Error:", error);

        showError(error || "Something went wrong");
      },
      true,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />

      <ModalContent maxW="900px">
        <ModalHeader>Add New Doctor</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* English Name */}
              <FormControl>
                <FormLabel>English Name</FormLabel>

                <Input
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  placeholder="Dr. Sarah Khalid"
                />
              </FormControl>

              {/* Arabic Name */}
              <FormControl>
                <FormLabel>Arabic Name</FormLabel>

                <Input
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                  placeholder="د. سارة خالد"
                />
              </FormControl>

              {/* English About */}
              <FormControl>
                <FormLabel>English About</FormLabel>

                <Textarea
                  name="about_en"
                  value={formData.about_en}
                  onChange={handleChange}
                  placeholder="Dr. Sarah Khalid is a specialized neurosurgeon..."
                />
              </FormControl>

              {/* Arabic About */}
              <FormControl>
                <FormLabel>Arabic About</FormLabel>

                <Textarea
                  name="about_ar"
                  value={formData.about_ar}
                  onChange={handleChange}
                  placeholder="د. سارة خالد متخصصة في جراحة المخ والأعصاب..."
                />
              </FormControl>

              {/* English Experience */}
              <FormControl>
                <FormLabel>English Experience</FormLabel>

                <Input
                  type="number"
                  name="experience_en"
                  value={formData.experience_en}
                  onChange={handleChange}
                  placeholder="10"
                />
              </FormControl>

              {/* Arabic Experience */}
              <FormControl>
                <FormLabel>Arabic Experience</FormLabel>

                <Input
                  type="number"
                  name="experience_ar"
                  value={formData.experience_ar}
                  onChange={handleChange}
                  placeholder="10"
                />
              </FormControl>

              {/* English Position */}
              <FormControl>
                <FormLabel>English Position</FormLabel>

                <Input
                  name="position_en"
                  value={formData.position_en}
                  onChange={handleChange}
                  placeholder="Consultant Neurosurgeon"
                />
              </FormControl>

              {/* Arabic Position */}
              <FormControl>
                <FormLabel>Arabic Position</FormLabel>

                <Input
                  name="position_ar"
                  value={formData.position_ar}
                  onChange={handleChange}
                  placeholder="استشاري جراحة الأعصاب"
                />
              </FormControl>

              {/* Image */}
              <FormControl>
                <FormLabel>Doctor Image</FormLabel>

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </FormControl>
              {/* Category */}

              <FormControl>
                <FormLabel>Category</FormLabel>

                <Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  placeholder="Select Category"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_en}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>

            {/* Buttons */}
            <Flex mt={6} justify="flex-end" gap={3}>
              <Button onClick={onClose}>Cancel</Button>

              <Button colorScheme="blue" onClick={handleAddDoctor}>
                ADD Doctor
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddDoctors;

// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   Text,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   HStack,
//   Input,
//   useColorModeValue,
//   useColorMode,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import { apiPostSecure, apiUrl } from "utils/api";
// import { showError, showSucess } from "utils/toast";
// import RoleSelect from "components/Select/RoleSelect";
// import Category from "./category";
// const AddDoctors = ({ isOpen, onClose, onHospitalAdded }) => {
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgForm = useColorModeValue("white", "navy.800");
//   const { colorMode } = useColorMode();

//   const [formData, setFormData] = useState({
//     name_en: "",
//     name_ar: "",
//     description_en: "",
//     description_ar: "",
//     location_en: "",
//     location_ar: "",
//     image: null,
//   });
//   useEffect(() => {
//     if (!isOpen) {
//       setFormData({
//         name_en: "",
//         name_ar: "",
//         description_en: "",
//         description_ar: "",
//         image: null,
//       });
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleAddHospital = () => {
//     if (
//       !formData.name_en ||
//       !formData.name_ar ||
//       !formData.description_en ||
//       !formData.description_ar
//     ) {
//       showError("All fields are required");
//       return;
//     }

//     const form = new FormData();

//     form.append("name_en", formData.name_en);
//     form.append("name_ar", formData.name_ar);
//     form.append("description_en", formData.description_en);
//     form.append("description_ar", formData.description_ar);
//     form.append("location_en", formData.location_en);
//     form.append("location_ar", formData.location_ar);

//     if (formData.image) {
//       form.append("image", formData.image);
//     }

//     // 🔍 Debug print
//     form.forEach((value, key) => {
//       console.log(key, value);
//     });

//     apiPostSecure(
//       apiUrl.hospitals,
//       form,
//       (res) => {
//         showSucess("Hospital Added Successfully! 🎉");
//         onClose();
//         onHospitalAdded && onHospitalAdded();
//       },
//       (error) => {
//         console.log("error", error);
//         showError(error || "Something went wrong");
//       },
//       true, // 👈 multipart flag if needed
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />
//       <ModalContent maxW="800px">
//         <ModalHeader>Add New Hospital</ModalHeader>
//         <ModalCloseButton color="red.500" />
//         <ModalBody>
//           <Flex direction="column" w="100%" p="20px">
//             <FormControl mt={4}>
//               <FormLabel>Image</FormLabel>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     image: e.target.files[0],
//                   }))
//                 }
//               />
//             </FormControl>
//             <Category />
//             <SimpleGrid columns={2} spacing={4} mb={4}>
//               <FormControl>
//                 <FormLabel>English Name</FormLabel>
//                 <Input
//                   name="name_en"
//                   value={formData.name_en}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Arabic Name</FormLabel>
//                 <Input
//                   name="name_ar"
//                   value={formData.name_ar}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>English Description</FormLabel>
//                 <Input
//                   name="description_en"
//                   value={formData.description_en}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Arabic Description</FormLabel>
//                 <Input
//                   name="description_ar"
//                   value={formData.description_ar}
//                   onChange={handleChange}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>English location</FormLabel>
//                 <Input
//                   name="location_en"
//                   value={formData.location_en}
//                   onChange={handleChange}
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Arabic location</FormLabel>
//                 <Input
//                   name="location_ar"
//                   value={formData.location_ar}
//                   onChange={handleChange}
//                 />
//               </FormControl>
//             </SimpleGrid>
//             <Flex mt={4} w="50%" ml="auto" justify="flex-end" gap={2}>
//               <Button onClick={onClose}>Cancel</Button>
//               <Button colorScheme="blue" onClick={handleAddHospital} ml={3}>
//                 ADD Hospital
//               </Button>
//             </Flex>
//           </Flex>
//           {/* </Flex> */}
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AddDoctors;
