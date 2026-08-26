// import React, { useEffect, useState, useRef } from "react";
// import {
//   Flex,
//   Table,
//   Tbody,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
//   Button,
//   AlertDialog,
//   AlertDialogBody,
//   AvatarGroup,
//   Avatar,
//   AlertDialogFooter,
//   Grid,
//   AlertDialogHeader,
//   Box,
//   AlertDialogContent,
//   AlertDialogOverlay,
//   Icon,
//   Image,
//   useColorMode,
//   useDisclosure,
// } from "@chakra-ui/react";
// // Custom components
// import {
//   FaCube,
//   FaFacebook,
//   FaInstagram,
//   FaPenFancy,
//   FaPlus,
//   FaTwitter,
// } from "react-icons/fa";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablesProjectRow from "components/Tables/TablesProjectRow";
// import TablesTableRow from "components/Tables/TablesTableRow";
// import { tablesProjectData, tablesTableData } from "variables/general";
// import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
// import { showSucess, showError } from "utils/toast";
// import { Link } from "react-router-dom";
// import { FaPencilAlt, FaTrashAlt, FaFilePdf } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { MdDateRange } from "react-icons/md";

// import AddTestimonials from "./AddTestimonials";

// function Testimonials() {
//   const textColor = useColorModeValue("gray.700", "white");
//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const iconColor = useColorModeValue("#3182CE", "#63B3ED");
//   const { colorMode } = useColorMode();

//   const {
//     isOpen: isAddServiceOpen,
//     onOpen: openAddService,
//     onClose: closeAddService,
//   } = useDisclosure();

//   const [serviceData, setServiceData] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const cancelRef = useRef();

//   useEffect(() => {
//     ServicesData();
//   }, []);

//   const ServicesData = () => {
//     apiCallSecureGet(
//       apiUrl.testimonialsList,
//       (response) => {
//         console.log("ServicesList", response.list);
//         setServiceData(response.list || []);
//       },
//       (error) => {
//         console.log("error", error);
//       },
//     );
//   };

//   const handleDeleteClick = (service) => {
//     console.log("Delete button clicked");
//     setSelectedService(service);
//     setIsDeleteOpen(true);
//   };

//   const confirmDelete = () => {
//     if (selectedService?.id) {
//       apiCallSecureDelete(
//         apiUrl.Testimonials,
//         selectedService.id,
//         (response) => {
//           console.log("Deleted successfully", response);

//           showSucess("Service deleted successfully!");

//           setIsDeleteOpen(false);
//           setSelectedService(null);

//           ServicesData();
//         },
//         (error) => {
//           console.log("Delete error", error);

//           showError(error || "Something went wrong. Please try again.");

//           setIsDeleteOpen(false);
//         },
//       );
//     }
//   };

//   const handleEditClick = (service) => {
//     setSelectedService(service);
//     setIsEditOpen(true);
//   };

//   return (
//     <>
//       <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
//         <Card overflowX={{ sm: "scroll", xl: "hidden" }} p="10px">
//           <CardHeader p="6px 0px 22px 0px">
//             <Flex align="center" justify="space-between" w="100%">
//               <Text fontSize="xl" color={textColor} fontWeight="bold">
//                 Services
//               </Text>

//               <Button
//                 variant={colorMode === "primary" ? "dark" : "primary"}
//                 onClick={openAddService}
//               >
//                 ADD SERVICE
//               </Button>
//             </Flex>
//           </CardHeader>

//           <CardBody px="5px" p="10px" bg="white">
//             {serviceData.length === 0 ? (
//               <Flex align="center" justify="center" w="100%" h="200px">
//                 <Text fontSize="lg" fontWeight="semibold" color="gray.500">
//                   No Services Found
//                 </Text>
//               </Flex>
//             ) : (
//               <Grid
//                 m={2}
//                 width="calc(100% - 16px)"
//                 minWidth={0}
//                 templateColumns={{
//                   base: "minmax(0, 1fr)",
//                   sm: "minmax(0, 1fr)",
//                   md: "repeat(2, minmax(0, 1fr))",
//                   lg: "repeat(3, minmax(0, 1fr))",
//                   xl: "repeat(3, minmax(0, 1fr))",
//                 }}
//                 gap={{ base: "16px", md: "20px", xl: "24px" }}
//               >
//                 {serviceData.map((service) => (
//                   <Link
//                     key={service.id}
//                     to={`/admin/services/${service.id}`}
//                     style={{
//                       textDecoration: "none",
//                       width: "100%",
//                       minWidth: 0,
//                       display: "block",
//                     }}
//                   >
//                     <Flex
//                       direction="column"
//                       p="10px"
//                       bg="white"
//                       borderRadius="15px"
//                       boxShadow="0 4px 15px rgba(0, 0, 0, 0.10)"
//                       transition="all 0.2s ease"
//                       _hover={{
//                         boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
//                         transform: "translateY(-3px)",
//                       }}
//                     >
//                       <Box mb="20px" position="relative" borderRadius="15px">
//                         <Image
//                           src={service.image}
//                           borderRadius="15px"
//                           alt={service.name_en}
//                           w="100%"
//                           h="200px"
//                           objectFit="cover"
//                         />

//                         <Box
//                           w="100%"
//                           h="100%"
//                           position="absolute"
//                           top="0"
//                           borderRadius="15px"
//                           bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
//                         />
//                       </Box>

//                       <Flex direction="column">
//                         <Text
//                           fontSize="xl"
//                           color={textColor}
//                           fontWeight="bold"
//                           mb="10px"
//                           noOfLines={1}
//                         >
//                           {service.name_en}
//                         </Text>

//                         <Text
//                           fontSize="md"
//                           color={textColor}
//                           fontWeight="400"
//                           mb="20px"
//                           noOfLines={3}
//                           minH="90px"
//                           maxH="120px"
//                           overflow="hidden"
//                         >
//                           {service.description_en}
//                         </Text>

//                         <Flex justifyContent="space-between">
//                           {/* EDIT */}
//                           <Button
//                             p="0px"
//                             bg="transparent"
//                             variant="no-effects"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               handleEditClick(service);
//                             }}
//                           >
//                             <Flex
//                               color="blue.500"
//                               cursor="pointer"
//                               align="center"
//                               p="12px"
//                             >
//                               <Icon as={FaPencilAlt} me="4px" />

//                               <Text fontSize="sm" fontWeight="semibold">
//                                 EDIT
//                               </Text>
//                             </Flex>
//                           </Button>

//                           {/* DELETE */}
//                           <Button
//                             p="0px"
//                             bg="transparent"
//                             variant="no-effects"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               handleDeleteClick(service);
//                             }}
//                           >
//                             <Flex
//                               color="red.500"
//                               cursor="pointer"
//                               align="center"
//                               p="12px"
//                             >
//                               <Icon as={FaTrashAlt} me="4px" />

//                               <Text fontSize="sm" fontWeight="semibold">
//                                 DELETE
//                               </Text>
//                             </Flex>
//                           </Button>
//                         </Flex>
//                       </Flex>
//                     </Flex>
//                   </Link>
//                 ))}
//               </Grid>
//             )}
//           </CardBody>
//         </Card>
//       </Flex>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog
//         isOpen={isDeleteOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={() => setIsDeleteOpen(false)}
//         isCentered
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Delete Service
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               Are you sure you want to delete{" "}
//               <b>{selectedService?.name_en || ""}</b>?
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={() => setIsDeleteOpen(false)}>
//                 Cancel
//               </Button>

//               <Button colorScheme="red" onClick={confirmDelete} ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>

//       {/* Add Service */}
//       <AddTestimonials
//         isOpen={isAddServiceOpen}
//         onClose={closeAddService}
//         onServiceAdded={ServicesData}
//       />

//       {/* Edit Service */}
//     </>
//   );
// }

// export default Testimonials;

import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  Grid,
  AlertDialogHeader,
  Box,
  AlertDialogContent,
  AlertDialogOverlay,
  Icon,
  Image,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";

import { showSucess, showError } from "utils/toast";
import { Link } from "react-router-dom";

import AddTestimonials from "./AddTestimonials";

function Testimonials() {
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();

  const {
    isOpen: isAddTestimonialOpen,
    onOpen: openAddTestimonial,
    onClose: closeAddTestimonial,
  } = useDisclosure();

  const [testimonialData, setTestimonialData] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const cancelRef = useRef();

  useEffect(() => {
    testimonialsData();
  }, []);

  // Get Testimonials
  const testimonialsData = () => {
    apiCallSecureGet(
      apiUrl.testimonialsList,
      (response) => {
        console.log("TestimonialsList", response.list);
        setTestimonialData(response.list || []);
      },
      (error) => {
        console.log("Testimonials error", error);
      },
    );
  };

  // Delete button
  const handleDeleteClick = (testimonial) => {
    console.log("Delete testimonial clicked");

    setSelectedTestimonial(testimonial);
    setIsDeleteOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedTestimonial?.id) {
      apiCallSecureDelete(
        apiUrl.Testimonials,
        selectedTestimonial.id,
        (response) => {
          console.log("Testimonial deleted successfully", response);

          showSucess("Testimonial deleted successfully!");

          setIsDeleteOpen(false);
          setSelectedTestimonial(null);

          testimonialsData();
        },
        (error) => {
          console.log("Delete testimonial error", error);

          showError(error || "Something went wrong. Please try again.");

          setIsDeleteOpen(false);
        },
      );
    }
  };

  // Edit testimonial
  const handleEditClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditOpen(true);
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} p="10px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Testimonials
              </Text>

              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddTestimonial}
              >
                ADD TESTIMONIAL
              </Button>
            </Flex>
          </CardHeader>

          <CardBody px="5px" p="10px" bg="white">
            {testimonialData.length === 0 ? (
              <Flex align="center" justify="center" w="100%" h="200px">
                <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                  No Testimonials Found
                </Text>
              </Flex>
            ) : (
              <Grid
                m={2}
                width="calc(100% - 16px)"
                minWidth={0}
                templateColumns={{
                  base: "minmax(0, 1fr)",
                  sm: "minmax(0, 1fr)",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                  xl: "repeat(3, minmax(0, 1fr))",
                }}
                gap={{
                  base: "16px",
                  md: "20px",
                  xl: "24px",
                }}
              >
                {testimonialData.map((testimonial) => (
                  <Link
                    key={testimonial.id}
                    to={`/admin/testimonials/${testimonial.id}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      minWidth: 0,
                      display: "block",
                    }}
                  >
                    <Flex
                      direction="column"
                      p="10px"
                      bg="white"
                      borderRadius="15px"
                      boxShadow="0 4px 15px rgba(0, 0, 0, 0.10)"
                      transition="all 0.2s ease"
                      _hover={{
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-3px)",
                      }}
                    >
                      {/* Image */}
                      <Box mb="10px" position="relative" borderRadius="15px">
                        <Image
                          src={testimonial.image}
                          borderRadius="15px"
                          alt={testimonial.name_en}
                          w="100%"
                          h="200px"
                          objectFit="cover"
                        />

                        <Box
                          w="100%"
                          h="100%"
                          position="absolute"
                          top="0"
                          borderRadius="15px"
                          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                        />
                      </Box>

                      <Flex direction="column">
                        {/* Name */}

                        {/* Actions */}
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {/* DELETE */}
                          <Button
                            p="0px"
                            bg="transparent"
                            variant="no-effects"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteClick(testimonial);
                            }}
                          >
                            <Flex
                              color="red.500"
                              cursor="pointer"
                              align="center"
                              p="12px"
                            >
                              <Icon as={FaTrashAlt} me="4px" />
                            </Flex>
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Link>
                ))}
              </Grid>
            )}
          </CardBody>
        </Card>
      </Flex>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Testimonial
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>{selectedTestimonial?.name_en || ""}</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>

              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Add Testimonial */}
      <AddTestimonials
        isOpen={isAddTestimonialOpen}
        onClose={closeAddTestimonial}
        onTestimonialAdded={testimonialsData}
      />

      {/* Edit Testimonial */}
      {/* Add your EditTestimonials component here */}
    </>
  );
}

export default Testimonials;
