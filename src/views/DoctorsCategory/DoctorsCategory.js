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
import EditServices from "./EditDoctorsCategory";
import { FaPencilAlt, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import AddServices from "./AddDoctorsCategory";
function DoctorsCategory() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("#3182CE", "#63B3ED");
  const { colorMode } = useColorMode();

  const {
    isOpen: isAddServiceOpen,
    onOpen: openAddService,
    onClose: closeAddService,
  } = useDisclosure();

  const [DoctorsCategoryData, setDoctorsCategoryData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const cancelRef = useRef();

  useEffect(() => {
    ServicesData();
  }, []);

  const ServicesData = () => {
    apiCallSecureGet(
      apiUrl.DoctorsCategory,
      (response) => {
        console.log("ServicesList", response.list);
        setDoctorsCategoryData(response.list || []);
      },
      (error) => {
        console.log("error", error);
      },
    );
  };

  const handleDeleteClick = (drCategory) => {
    console.log("Delete button clicked");
    setSelectedService(drCategory);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedService?.id) {
      apiCallSecureDelete(
        apiUrl.DoctorsCategory,
        selectedService.id,
        (response) => {
          console.log("Deleted successfully", response);

          showSucess("Doctors Category deleted successfully!");

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

  const handleEditClick = (drCategory) => {
    setSelectedService(drCategory);
    setIsEditOpen(true);
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} p="10px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                DoctorsCategory
              </Text>

              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddService}
              >
                ADD Doctors Category
              </Button>
            </Flex>
          </CardHeader>

          <CardBody px="5px" p="10px" bg="white">
            {DoctorsCategoryData.length === 0 ? (
              <Flex align="center" justify="center" w="100%" h="200px">
                <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                  No Doctors Category Found
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
                {DoctorsCategoryData.map((drCategory) => (
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
                    <Flex direction="column">
                      <Text
                        fontSize="xl"
                        color={textColor}
                        fontWeight="bold"
                        mb="10px"
                        noOfLines={1}
                      >
                        {drCategory.name_en}
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
                            handleEditClick(drCategory);
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
                            handleDeleteClick(drCategory);
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
              Delete Doctors Category
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

      {/* Add drCategory */}
      <AddServices
        isOpen={isAddServiceOpen}
        onClose={closeAddService}
        onServiceAdded={ServicesData}
      />

      {/* Edit drCategory */}
      <EditServices
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedService(null);
        }}
        drCategory={selectedService}
        onServiceUpdated={ServicesData}
      />
    </>
  );
}

export default DoctorsCategory;
