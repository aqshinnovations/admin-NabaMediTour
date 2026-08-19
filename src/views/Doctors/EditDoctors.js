import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { apiCallPutWithForm, apiCallSecureGet, apiUrl } from "utils/api";

import { showSucess, showError } from "utils/toast";

function EditDoctor({ isOpen, onClose, Hospital, onHospitalUpdated }) {
  console.log("Doctor", Hospital);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    category_id: "",
    name_en: "",
    name_ar: "",
    about_en: "",
    about_ar: "",
    experience_en: "",
    experience_ar: "",
    position_en: "",
    position_ar: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  // =========================
  // Get Categories
  // =========================
  useEffect(() => {
    CategoryList();
  }, []);

  const CategoryList = () => {
    apiCallSecureGet(
      apiUrl.Category,
      (response) => {
        console.log("Categories:", response.list);

        setCategories(response.list || []);
      },
      (error) => {
        console.log("Category error:", error);
        setCategories([]);
      },
    );
  };

  // =========================
  // Set Doctor Data
  // =========================
  useEffect(() => {
    if (Hospital) {
      console.log("Selected Doctor:", Hospital);

      setFormData({
        id: Hospital.id || "",
        category_id:
          Hospital.category_id ||
          Hospital.category?.id ||
          Hospital.category?.category_id ||
          "",
        name_en: Hospital.name_en || "",
        name_ar: Hospital.name_ar || "",
        about_en: Hospital.about_en || "",
        about_ar: Hospital.about_ar || "",
        experience_en: Hospital.experience_en || "",
        experience_ar: Hospital.experience_ar || "",
        position_en: Hospital.position_en || "",
        position_ar: Hospital.position_ar || "",
        image: null,
      });

      if (Hospital.image) {
        setImagePreview(
          Hospital.image.startsWith("http")
            ? Hospital.image
            : `${apiUrl.imageBaseUrl}${Hospital.image}`,
        );
      } else {
        setImagePreview("");
      }
    }
  }, [Hospital]);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Handle Image
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =========================
  // Update Doctor
  // =========================
  const handleSubmit = () => {
    if (
      !formData.category_id ||
      !formData.name_en ||
      !formData.name_ar ||
      !formData.about_en ||
      !formData.about_ar ||
      !formData.experience_en ||
      !formData.experience_ar ||
      !formData.position_en ||
      !formData.position_ar
    ) {
      showError("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("id", formData.id);

    form.append("category_id", formData.category_id);

    form.append("name_en", formData.name_en);
    form.append("name_ar", formData.name_ar);

    form.append("about_en", formData.about_en);
    form.append("about_ar", formData.about_ar);

    form.append("experience_en", formData.experience_en);
    form.append("experience_ar", formData.experience_ar);

    form.append("position_en", formData.position_en);
    form.append("position_ar", formData.position_ar);

    // Only send image if user selected a new image
    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    // Debug
    console.log("----- Update Doctor FormData -----");

    form.forEach((value, key) => {
      console.log(key, value);
    });

    apiCallPutWithForm(
      apiUrl.Doctors,
      form,
      (response) => {
        console.log("Doctor updated:", response);

        showSucess("Doctor updated successfully!");

        if (onHospitalUpdated) {
          onHospitalUpdated();
        }

        onClose();
      },
      (error) => {
        console.log("Update error:", error);

        showError(error || "Something went wrong");
      },
      true,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />

      <ModalContent maxW="900px">
        <ModalHeader>Edit Doctor</ModalHeader>

        <ModalCloseButton color="red.500" />

        <ModalBody>
          <Flex direction="column" w="100%" p="20px">
            {/* Image */}
            <FormControl mb={5}>
              <FormLabel>Doctor Image</FormLabel>

              {imagePreview && (
                <Box mb={4}>
                  <Image
                    src={imagePreview}
                    alt={formData.name_en}
                    width="200px"
                    height="130px"
                    objectFit="cover"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor="gray.200"
                  />
                </Box>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* English Name */}
              <FormControl>
                <FormLabel>English Name</FormLabel>

                <Input
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic Name */}
              <FormControl>
                <FormLabel>Arabic Name</FormLabel>

                <Input
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                />
              </FormControl>

              {/* English About */}
              <FormControl>
                <FormLabel>English About</FormLabel>

                <Textarea
                  name="about_en"
                  value={formData.about_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic About */}
              <FormControl>
                <FormLabel>Arabic About</FormLabel>

                <Textarea
                  name="about_ar"
                  value={formData.about_ar}
                  onChange={handleChange}
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
                />
              </FormControl>

              {/* English Position */}
              <FormControl>
                <FormLabel>English Position</FormLabel>

                <Input
                  name="position_en"
                  value={formData.position_en}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Arabic Position */}
              <FormControl>
                <FormLabel>Arabic Position</FormLabel>

                <Input
                  name="position_ar"
                  value={formData.position_ar}
                  onChange={handleChange}
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>

          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Update Doctor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditDoctor;

// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Box,
//   Flex,
//   Image,
//   FormControl,
//   FormLabel,
//   Input,
//   SimpleGrid,
//   Select,
// } from "@chakra-ui/react";
// import { apiCallPutWithForm, apiUrl } from "utils/api";
// import { showSucess, showError } from "utils/toast";
// import RoleSelect from "components/Select/RoleSelect";
// function EditDoctor({ isOpen, onClose, Hospital, onHospitalUpdated }) {
//   console.log("Hospital", Hospital);
//   const [formData, setFormData] = useState({
//     id: "",
//     name_en: "",
//     name_ar: "",
//     description_en: "",
//     description_ar: "",
//     image: null,
//   });
//   const [imagePreview, setImagePreview] = useState("");

//   useEffect(() => {
//     if (Hospital) {
//       setFormData({
//         id: Hospital.id || "",
//         name_en: Hospital.name_en || "",
//         name_ar: Hospital.name_ar || "",
//         description_en: Hospital.description_en || "",
//         description_ar: Hospital.description_ar || "",
//         image: Hospital.image,
//       });
//       if (Hospital.image) {
//         setImagePreview(
//           Hospital.image.startsWith("http")
//             ? Hospital.image
//             : `${apiUrl.imageBaseUrl}${Hospital.image}`,
//         );
//       } else {
//         setImagePreview("");
//       }
//     }
//   }, [Hospital]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     // Save selected File
//     setFormData((prev) => ({
//       ...prev,
//       image: file,
//     }));

//     // Show selected image immediately
//     const previewUrl = URL.createObjectURL(file);
//     setImagePreview(previewUrl);
//   };

//   const handleSubmit = () => {
//     const form = new FormData();

//     form.append("id", formData.id);
//     form.append("name_en", formData.name_en);
//     form.append("name_ar", formData.name_ar);
//     form.append("description_en", formData.description_en);
//     form.append("description_ar", formData.description_ar);

//     if (formData.image instanceof File) {
//       form.append("image", formData.image);
//     }
//     console.log("---- FormData ----");
//     form.forEach((value, key) => {
//       console.log(key, value);
//     });
//     apiCallPutWithForm(
//       apiUrl.hospitals,
//       form,
//       (response) => {
//         showSucess("Hospital updated successfully!");
//         onHospitalUpdated();
//         onClose();
//       },
//       (error) => {
//         console.log("Update error", error);
//         showError(error || "Something went wrong");
//       },
//       true,
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />
//       <ModalContent maxW="800px">
//         <ModalHeader>Edit Hospital</ModalHeader>
//         <ModalCloseButton color="red.500" />
//         <Flex direction="column" w="100%" p="20px">
//           <ModalBody>
//             <FormControl mt={4}>
//               <FormLabel>Hospital Image</FormLabel>

//               {imagePreview && (
//                 <Box mb={4}>
//                   <Image
//                     src={imagePreview}
//                     alt={formData.name_en}
//                     width="200px"
//                     height="130px"
//                     objectFit="cover"
//                     borderRadius="10px"
//                     border="1px solid"
//                     borderColor="gray.200"
//                   />
//                 </Box>
//               )}

//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </FormControl>
//             {/* Row 1: First + Last Name */}

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
//             </SimpleGrid>
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={onClose}>Cancel</Button>
//             <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
//               Update
//             </Button>
//           </ModalFooter>
//         </Flex>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default EditDoctor;
