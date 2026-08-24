import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  AlertDialog,
  AlertDialogBody,
  AvatarGroup,
  Avatar,
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
// Custom components
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
import { showSucess, showError } from "utils/toast";
import { Link } from "react-router-dom";
import EditServices from "./EditServices";
import { FaPencilAlt, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import AddServices from "./AddServices";

// function Services() {
//   const textColor = useColorModeValue("gray.700", "white");
//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const iconColor = useColorModeValue("#3182CE", "#63B3ED");
//   const { colorMode } = useColorMode();
//   const {
//     isOpen: isAddBlogOpen,
//     onOpen: openAddBlog,
//     onClose: closeAddBlog,
//   } = useDisclosure(); // ✅ renamed properly

//   const [blogData, setBlogData] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const cancelRef = useRef();

//   useEffect(() => {
//     BlogsData();
//   }, []);

//   const BlogsData = () => {
//     apiCallSecureGet(
//       apiUrl.ServicesList,
//       (response) => {
//         console.log("ServicesList", response.list);
//         setBlogData(response.list);
//       },
//       (error) => {
//         console.log("error", error);
//       },
//     );
//   };

//   const handleDeleteClick = (blog) => {
//     console.log("btn clicked");
//     setSelectedBlog(blog);
//     setIsOpen(true);
//   };

//   const confirmDelete = () => {
//     if (selectedBlog?.id) {
//       apiCallSecureDelete(
//         apiUrl.Services,
//         selectedBlog.id,
//         (response) => {
//           console.log("Deleted successfully", response);
//           showSucess("Service deleted successfully!");
//           setIsOpen(false);
//           setSelectedBlog(null);
//           BlogsData();
//         },
//         (error) => {
//           console.log("Delete error", error);
//           showError(error || "something went wrong please try again");
//           setIsOpen(false);
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
//                 Blogs
//               </Text>
//               <Button
//                 variant={colorMode === "primary" ? "dark" : "primary"}
//                 onClick={openAddBlog}
//               >
//                 ADD BlOG
//               </Button>
//             </Flex>
//           </CardHeader>

//           <CardBody px="5px" p="10px" bg="white">
//             {blogData.length === 0 ? (
//               <Flex align="center" justify="center" w="100%" h="200px">
//                 <Text fontSize="lg" fontWeight="semibold" color="gray.500">
//                   No data found
//                 </Text>
//               </Flex>
//             ) : (
//               <Grid
//                 m={2}
//                 templateColumns={{
//                   sm: "1fr",
//                   md: "1fr 1fr",
//                   xl: "repeat(3, 1fr)",
//                 }}
//                 templateRows={{
//                   sm: "1fr 1fr 1fr auto",
//                   md: "1fr 1fr",
//                   xl: "1fr",
//                 }}
//                 gap="24px"
//               >
//                 {blogData.map((blog) => (
//                   <Link
//                     to={`/admin/blog/${blog.id}`}
//                     style={{ textDecoration: "none" }}
//                   >
//                     <Flex
//                       key={blog.id}
//                       direction="column"
//                       p="10px"
//                       boxShadow="sm"
//                       borderRadius="15px"
//                       bg="white"
//                     >
//                       <Box mb="20px" position="relative" borderRadius="15px">
//                         <Image
//                           src={blog.image}
//                           borderRadius="15px"
//                           alt={blog.name_en}
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
//                         ></Box>
//                       </Box>

//                       <Flex direction="column">
//                         <Text
//                           fontSize="xl"
//                           color={textColor}
//                           fontWeight="bold"
//                           mb="10px"
//                           noOfLines={1}
//                         >
//                           {blog.name_en}
//                         </Text>

//                         <Text
//                           fontSize="md"
//                           color={textColor}
//                           fontWeight="400"
//                           mb="20px"
//                           noOfLines={2}
//                         >
//                           {blog.description_en}
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
//                               handleEditClick(blog);
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
//                               handleDeleteClick(blog);
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
//                         {/* <Flex justifyContent="space-between">
//                           <Button
//                             p="0px"
//                             bg="transparent"
//                             variant="no-effects"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               handleDeleteClick(blog);
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
//                         </Flex> */}
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
//         isOpen={isOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={() => setIsOpen(false)}
//         isCentered
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Delete Blog
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               Are you sure you want to delete <b>{selectedBlog?.title || ""}</b>
//               ?
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
//                 Cancel
//               </Button>
//               <Button colorScheme="red" onClick={confirmDelete} ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>

//       <AddServices
//         isOpen={isAddBlogOpen}
//         onClose={closeAddBlog}
//         onServiceAdded={BlogsData}
//       />
//       <EditServices
//         isOpen={isEditOpen}
//         onClose={() => {
//           setIsEditOpen(false);
//           setSelectedService(null);
//         }}
//         service={selectedService}
//         onServiceUpdated={BlogsData}
//       />
//     </>
//   );
// }
function Services() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("#3182CE", "#63B3ED");
  const { colorMode } = useColorMode();

  const {
    isOpen: isAddServiceOpen,
    onOpen: openAddService,
    onClose: closeAddService,
  } = useDisclosure();

  const [serviceData, setServiceData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const cancelRef = useRef();

  useEffect(() => {
    ServicesData();
  }, []);

  const ServicesData = () => {
    apiCallSecureGet(
      apiUrl.ServicesList,
      (response) => {
        console.log("ServicesList", response.list);
        setServiceData(response.list || []);
      },
      (error) => {
        console.log("error", error);
      },
    );
  };

  const handleDeleteClick = (service) => {
    console.log("Delete button clicked");
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedService?.id) {
      apiCallSecureDelete(
        apiUrl.Services,
        selectedService.id,
        (response) => {
          console.log("Deleted successfully", response);

          showSucess("Service deleted successfully!");

          setIsDeleteOpen(false);
          setSelectedService(null);

          ServicesData();
        },
        (error) => {
          console.log("Delete error", error);

          showError(error || "Something went wrong. Please try again.");

          setIsDeleteOpen(false);
        },
      );
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsEditOpen(true);
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} p="10px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Services
              </Text>

              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddService}
              >
                ADD SERVICE
              </Button>
            </Flex>
          </CardHeader>

          <CardBody px="5px" p="10px" bg="white">
            {serviceData.length === 0 ? (
              <Flex align="center" justify="center" w="100%" h="200px">
                <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                  No Services Found
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
                gap={{ base: "16px", md: "20px", xl: "24px" }}
              >
                {serviceData.map((service) => (
                  <Link
                    key={service.id}
                    to={`/admin/services/${service.id}`}
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
                      <Box mb="20px" position="relative" borderRadius="15px">
                        <Image
                          src={service.image}
                          borderRadius="15px"
                          alt={service.name_en}
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
                        <Text
                          fontSize="xl"
                          color={textColor}
                          fontWeight="bold"
                          mb="10px"
                          noOfLines={1}
                        >
                          {service.name_en}
                        </Text>

                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="400"
                          mb="20px"
                          noOfLines={3}
                          minH="90px"
                          maxH="120px"
                          overflow="hidden"
                        >
                          {service.description_en}
                        </Text>

                        <Flex justifyContent="space-between">
                          {/* EDIT */}
                          <Button
                            p="0px"
                            bg="transparent"
                            variant="no-effects"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEditClick(service);
                            }}
                          >
                            <Flex
                              color="blue.500"
                              cursor="pointer"
                              align="center"
                              p="12px"
                            >
                              <Icon as={FaPencilAlt} me="4px" />

                              <Text fontSize="sm" fontWeight="semibold">
                                EDIT
                              </Text>
                            </Flex>
                          </Button>

                          {/* DELETE */}
                          <Button
                            p="0px"
                            bg="transparent"
                            variant="no-effects"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteClick(service);
                            }}
                          >
                            <Flex
                              color="red.500"
                              cursor="pointer"
                              align="center"
                              p="12px"
                            >
                              <Icon as={FaTrashAlt} me="4px" />

                              <Text fontSize="sm" fontWeight="semibold">
                                DELETE
                              </Text>
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
              Delete Service
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>{selectedService?.name_en || ""}</b>?
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

      {/* Add Service */}
      <AddServices
        isOpen={isAddServiceOpen}
        onClose={closeAddService}
        onServiceAdded={ServicesData}
      />

      {/* Edit Service */}
      <EditServices
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
        onServiceUpdated={ServicesData}
      />
    </>
  );
}

export default Services;
