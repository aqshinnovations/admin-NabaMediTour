import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  Spinner,
  useColorModeValue,
  Button,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { apiCallSecureGet, apiUrl } from "utils/api";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Blogs from "./blogs";
import EditBlog from "./EditBlog";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("#3182CE", "#63B3ED");

  const {
    isOpen: isEditBlogOpen,
    onOpen: openEditBlog,
    onClose: closeEditBlog,
  } = useDisclosure();

  const [editBlog, setEditBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    getBlogContent();
  }, [id]);

  const getBlogContent = () => {
    apiCallSecureGet(
      `${apiUrl.BlogContent}?id=${id}`,
      (response) => {
        setBlog(response.list);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching blog", error);
        setLoading(false);
      },
    );
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!blog) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Text fontSize="lg" color="red.500">
          Blog not found.
        </Text>
      </Flex>
    );
  }

  console.log("blog", blog);
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
                onClick={() => {
                  setEditBlog(blog);
                  openEditBlog();
                }}
                variant={colorMode === "primary" ? "dark" : "primary"}
              >
                EDIT
              </Button>
            </Flex>
          </CardHeader>

          <CardBody px="5px" p="10px" bg="white">
            <Image
              src={blog.cover_image}
              // src={blog.cover_image}
              alt={blog.title}
              borderRadius="15px"
              w="100%"
              h="350px"
              objectFit="cover"
              mb={6}
            />

            <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={4}>
              {blog.title}
            </Text>

            <Flex justify="space-between" mb={4} color="gray.500" fontSize="md">
              <Text>By {blog.author}</Text>
              <Text>
                {new Date(blog.created_at).toISOString().split("T")[0]}
              </Text>
            </Flex>

            <Text
              fontSize="md"
              color={textColor}
              lineHeight="tall"
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/\r?\n/g, "<br/>"),
              }}
            />
          </CardBody>
        </Card>
      </Flex>
      <EditBlog
        isOpen={isEditBlogOpen}
        onClose={closeEditBlog}
        blog={editBlog}
        onBlogUpdated={getBlogContent}
      />
    </>
  );
}

export default BlogDetails;
