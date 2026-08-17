import React from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function SpecialtyList({ Specialties, onEdit, onDelete }) {
  if (!Specialties || Specialties.length === 0) {
    return <Text p="15px">No Specialties Found</Text>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "15px",
        padding: "10px",
      }}
    >
      {Specialties.map((specialty) => (
        <div
          key={specialty.id}
          style={{
            border: "1px solid hsla(44, 15%, 25%, 0.40)",
            borderRadius: "16px",
            padding: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* English + Arabic */}
          <Flex justify="space-between" align="center" gap="15px" mb="12px">
            <Text fontSize="md" fontWeight="bold" flex="1">
              {specialty.name_en}
            </Text>

            <Flex gap="15px" align="center">
              <Button
                p="0px"
                bg="transparent"
                onClick={() => onEdit(specialty)}
              >
                <Flex color="blue.500" align="center">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
              </Button>

              <Button
                p="0px"
                bg="transparent"
                onClick={() => onDelete(specialty)}
              >
                <Flex color="red.500" align="center">
                  <Icon as={FaTrashAlt} me="4px" />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </div>
      ))}
    </div>
  );
}

export default SpecialtyList;
