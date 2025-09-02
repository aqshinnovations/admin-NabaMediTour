import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Icon,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt, FaFilePdf, FaDownload } from "react-icons/fa";

function PatientsTable(props) {
  const {
    id,
    logo,
    name,
    email,
    subdomain,
    domain,
    status,
    date,
    isLast,
    AboutHealth,
    report,
    onDeleteClick,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleDownload = () => {
    if (report) {
      window.open(report, "_blank");
    } else {
      alert("No report available");
    }
  };

  return (
    <Tr>
      {/* 1. Name & Email */}
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      {/* 2. Domain & Subdomain */}
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {domain}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {subdomain}
          </Text>
        </Flex>
      </Td>

      {/* 3. Report Button */}
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {AboutHealth}
        </Text>
      </Td>

   {/* 4. Report Button */}
<Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
  {report ? (
    <Button
      p="0px"
      bg="transparent"
      variant="no-effects"
      color="blue.500"
      onClick={handleDownload}
    >
      <Flex alignItems="center" p="12px">
        <Icon as={FaDownload} me="4px" />
        <Text fontSize="md" fontWeight="bold">Download Report</Text>
      </Flex>
    </Button>
  ) : (
    <Text fontSize="sm" color="gray.400">
      No data
    </Text>
  )}
</Td>


      {/* 5. Date */}
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>

      {/* 6. Actions (Delete & Edit) */}
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
         <Button
          p="0px"
          bg="transparent"
  onClick={() => onDeleteClick({ id, name })} // ✅ pass object
        >
          <Flex color="red.500" align="center" p="12px">
            <Icon as={FaTrashAlt} me="4px" />
            <Text fontSize="sm" fontWeight="semibold">DELETE</Text>
          </Flex>
        </Button>

        {/* <Button p="0px" bg="transparent" variant="no-effects">
          <Flex color={textColor} cursor="pointer" align="center" p="12px">
            <Icon as={FaPencilAlt} me="4px" />
            <Text fontSize="sm" fontWeight="semibold">
              EDIT
            </Text>
          </Flex>
        </Button> */}
      </Td>
    </Tr>
  );
}

export default PatientsTable;
