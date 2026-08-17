import React from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";

function DoctorList({ doctors = [], onEdit, onDelete }) {
  if (!doctors || doctors.length === 0) {
    return (
      <Box
        p="20px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="12px"
        textAlign="center"
        mb="20px"
      >
        <Text>No Doctors Found</Text>
      </Box>
    );
  }

  return (
    <Box mb="25px">
      {doctors.map((doctor) => (
        <Box
          key={doctor.id}
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
            {/* Doctor Image */}
            <Box>
              {doctor.image ? (
                <Image
                  src={doctor.image}
                  alt={doctor.name_en}
                  width="90px"
                  height="90px"
                  objectFit="cover"
                  borderRadius="10px"
                />
              ) : (
                <Box
                  width="90px"
                  height="90px"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.100"
                >
                  <Text fontSize="xs">No Image</Text>
                </Box>
              )}
            </Box>

            {/* English */}
            <Box flex="1">
              <Text fontWeight="bold" fontSize="md" mb="5px">
                English
              </Text>

              <Text fontWeight="600">{doctor.name_en}</Text>

              <Text fontSize="sm" mt="5px">
                Specialist: {doctor.specialist_en}
              </Text>
            </Box>

            {/* Buttons */}
            <Flex gap="8px" align="center">
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => onEdit(doctor)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(doctor)}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default DoctorList;
