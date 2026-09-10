import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  IconButton,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

function ImagesList({ procedures = [], onDelete }) {
  if (!procedures || procedures.length === 0) {
    return (
      <Box
        p="20px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="12px"
        textAlign="center"
        mb="20px"
      >
        <Text>No Images Found</Text>
      </Box>
    );
  }

  return (
    <Box mb="25px">
      <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing="15px">
        {procedures.map((procedure) => (
          <Box
            key={procedure.id}
            position="relative"
            border="1px solid hsla(44, 15%, 25%, 0.40)"
            borderRadius="12px"
            overflow="hidden"
            bg="white"
          >
            {/* Image */}
            {procedure.image && (
              <Image
                src={procedure.image}
                alt={procedure.name_en || "Gallery Image"}
                width="100%"
                height="150px"
                objectFit="cover"
              />
            )}

            {/* Delete Button */}
            <IconButton
              aria-label="Delete image"
              icon={<Icon as={FaTrashAlt} />}
              position="absolute"
              top="8px"
              right="8px"
              size="sm"
              colorScheme="red"
              variant="solid"
              borderRadius="full"
              onClick={() => onDelete(procedure)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ImagesList;
