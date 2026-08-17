import React from "react";
import { Box, Flex, Text, Button, Image, Icon } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function ProcedureList({ procedures = [], onEdit, onDelete }) {
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
        <Text>No Procedures Found</Text>
      </Box>
    );
  }

  return (
    <Box mb="25px">
      {procedures.map((procedure) => (
        <Box
          key={procedure.id}
          border="1px solid hsla(44, 15%, 25%, 0.40)"
          borderRadius="16px"
          p="15px"
          mb="10px"
        >
          <Flex
            align="center"
            justify="space-between"
            gap="20px"
            flexWrap="wrap"
          >
            {/* Procedure Image */}
            {procedure.image && (
              <Image
                src={procedure.image}
                alt={procedure.name_en}
                width="90px"
                height="70px"
                objectFit="cover"
                borderRadius="10px"
              />
            )}

            {/* English */}
            <Box flex="1">
              <Text fontWeight="bold" fontSize="md" mb="5px">
                English
              </Text>

              <Text fontWeight="600">{procedure.name_en}</Text>

              {procedure.description_en && (
                <Text fontSize="sm" mt="5px" noOfLines={2}>
                  {procedure.description_en}
                </Text>
              )}
            </Box>

            {/* Buttons */}
            <Flex gap="8px" align="center">
              <Button
                p="0px"
                bg="transparent"
                onClick={() => onEdit(procedure)}
              >
                <Flex color="blue.500" align="center">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
              </Button>

              <Button
                p="0px"
                bg="transparent"
                onClick={() => onDelete(procedure)}
              >
                <Flex color="red.500" align="center">
                  <Icon as={FaTrashAlt} me="4px" />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default ProcedureList;
