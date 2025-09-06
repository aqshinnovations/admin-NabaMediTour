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

import { FaPencilAlt, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import AddBlog from "./AddBlog";
function Blogs() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("#3182CE", "#63B3ED");
  const { colorMode } = useColorMode();
  const {
    isOpen: isAddBlogOpen,
    onOpen: openAddBlog,
    onClose: closeAddBlog,
  } = useDisclosure(); // ✅ renamed properly

  const [blogData, setBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = useRef();

  useEffect(() => {
    BlogsData();
  }, []);

  const BlogsData = () => {
    apiCallSecureGet(
      apiUrl.Blogs,
      (response) => {
        console.log("Blogs", response.list);
        setBlogData(response.list);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleDeleteClick = (blog) => {
    console.log("btn clicked");
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBlog?.id) {
      apiCallSecureDelete(
        apiUrl.Blogs,
        selectedBlog.id,
        (response) => {
          console.log("Deleted successfully", response);
          showSucess("Blog deleted successfully!");
          setIsOpen(false);
          setSelectedBlog(null);
          BlogsData();
        },
        (error) => {
          console.log("Delete error", error);
          showError(error || "something went wrong please try again");
          setIsOpen(false);
        }
      );
    }
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} p="10px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Blogs
              </Text>
              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddBlog}
              >
                ADD BlOG
              </Button>
            </Flex>
          </CardHeader>

          <CardBody px="5px" p="10px" bg="white">
            {blogData.length === 0 ? (
              <Flex align="center" justify="center" w="100%" h="200px">
                <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                  No data found
                </Text>
              </Flex>
            ) : (
              <Grid
                m={2}
                templateColumns={{
                  sm: "1fr",
                  md: "1fr 1fr",
                  xl: "repeat(3, 1fr)",
                }}
                templateRows={{
                  sm: "1fr 1fr 1fr auto",
                  md: "1fr 1fr",
                  xl: "1fr",
                }}
                gap="24px"
              >
                {blogData.map((blog) => (
                  <Link
                    to={`/admin/blog/${blog.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Flex
                      key={blog.id}
                      direction="column"
                      p="10px"
                      boxShadow="lg"
                      borderRadius="15px"
                      bg="white"
                    >
                      <Box mb="20px" position="relative" borderRadius="15px">
                        <Image
                          src={blog.cover_image}
                          borderRadius="15px"
                          alt={blog.title}
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
                        ></Box>
                      </Box>

                      <Flex direction="column">
                        <Text
                          fontSize="xl"
                          color={textColor}
                          fontWeight="bold"
                          mb="10px"
                          noOfLines={1}
                        >
                          {blog.title}
                        </Text>
                        <Flex align="center" justify="space-between" w="100%">
                          <Flex align="center" gap={2}>
                            <FaUser size={14} color={iconColor} />
                            <Text
                              fontSize="sm"
                              color="gray.400"
                              fontWeight="600"
                            >
                              {blog.author}
                            </Text>
                          </Flex>

                          <Flex align="center" gap={2}>
                            <MdDateRange size={16} color={iconColor} />
                            <Text
                              fontSize="md"
                              color="gray.400"
                              fontWeight="400"
                            >
                              {
                                new Date(blog.created_at)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </Text>
                          </Flex>
                        </Flex>

                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="400"
                          mb="20px"
                          noOfLines={2}
                        >
                          {blog.content}
                        </Text>
                        <Flex justifyContent="space-between">
                          <Button
                            p="0px"
                            bg="transparent"
                            variant="no-effects"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteClick(blog);
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
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete <b>{selectedBlog?.title || ""}</b>
              ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AddBlog
        isOpen={isAddBlogOpen}
        onClose={closeAddBlog}
        onUserAdded={BlogsData}
      />
    </>
  );
}

export default Blogs;
