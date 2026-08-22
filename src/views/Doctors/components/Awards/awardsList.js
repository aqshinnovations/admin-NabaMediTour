import React from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function AwardsList({ awards, onEdit, onDelete }) {
  if (!awards || awards.length === 0) {
    return <Text p="15px">No awards Found</Text>;
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
      {awards.map((facility) => (
        <div
          key={facility.id}
          style={{
            border: "1px solid hsla(44, 15%, 25%, 0.40)",
            borderRadius: "16px",
            padding: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* English + Arabic */}
          <Flex justify="space-between" align="center" gap="15px" mb="12px">
            <Text fontSize="sm" flex="1">
              {facility.name_en}
            </Text>

            <Flex gap="15px" align="center">
              <Button p="0px" bg="transparent" onClick={() => onEdit(facility)}>
                <Flex color="blue.500" align="center">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
              </Button>

              <Button
                p="0px"
                bg="transparent"
                onClick={() => onDelete(facility)}
              >
                <Flex color="red.500" align="center">
                  <Icon as={FaTrashAlt} me="4px" />
                </Flex>
              </Button>
            </Flex>
          </Flex>

          {/* Actions */}
        </div>
      ))}
    </div>
  );
}

export default AwardsList;
