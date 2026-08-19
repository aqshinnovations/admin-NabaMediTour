import React, { useState } from "react";
import { Flex, Select, Button, Text, Box } from "@chakra-ui/react";

const SelectAndAddItem = ({
  items = [],
  selectedItems = [],
  onAdd,
  placeholder = "Select item",
  getItemId = (item) => item.id,
  getItemLabel = (item) => item.name_en,
}) => {
  const [selectedId, setSelectedId] = useState("");

  const handleAdd = () => {
    if (!selectedId) return;

    const selectedItem = items.find(
      (item) => String(getItemId(item)) === String(selectedId),
    );

    if (!selectedItem) return;

    // Prevent duplicate items
    const alreadyAdded = selectedItems.some(
      (item) => String(getItemId(item)) === String(getItemId(selectedItem)),
    );

    if (alreadyAdded) {
      setSelectedId("");
      return;
    }

    onAdd(selectedItem);
    setSelectedId("");
  };

  return (
    <Box>
      <Flex gap="10px" align="center">
        <Select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          placeholder={placeholder}
          flex="1"
        >
          {items.map((item) => (
            <option key={getItemId(item)} value={getItemId(item)}>
              {getItemLabel(item)}
            </option>
          ))}
        </Select>

        <Button colorScheme="blue" onClick={handleAdd} isDisabled={!selectedId}>
          Add
        </Button>
      </Flex>

      {selectedItems.length > 0 && (
        <Box mt="15px">
          {selectedItems.map((item) => (
            <Text key={getItemId(item)}>{getItemLabel(item)}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SelectAndAddItem;
