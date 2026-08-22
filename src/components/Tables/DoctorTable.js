import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function DoctorTable({ doctors, onEdit, onDelete }) {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const titleColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const history = useHistory();

  // Limit words for About
  const limitWords = (text, limit = 20) => {
    if (!text) return "-";

    const words = text.split(" ");

    if (words.length <= limit) return text;

    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={textColor} borderColor={borderColor}>
              Doctor
            </Th>

            <Th color={textColor} borderColor={borderColor}>
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {doctors?.map((doctor) => (
            <Tr key={doctor.id}>
              {/* Doctor Name + About */}
              <Td borderColor={borderColor}>
                <Flex direction="column">
                  <Text
                    fontWeight="bold"
                    color={titleColor}
                    cursor="pointer"
                    _hover={{
                      textDecoration: "underline",
                      color: "blue.500",
                    }}
                    onClick={() => {
                      const selectedDoctor = {
                        id: doctor.id,
                        name: doctor.name,
                        about: doctor.about,
                        image: doctor.image,
                      };

                      console.log("selectedDoctor", selectedDoctor);

                      history.push(`/admin/doctorDetail/${doctor.id}`);
                    }}
                  >
                    {doctor.name}
                  </Text>

                  <Text fontSize="sm" color="gray.400" mt="2px">
                    {limitWords(doctor.about)}
                  </Text>
                </Flex>
              </Td>

              {/* Actions */}
              <Td borderColor={borderColor}>
                <Flex>
                  {/* DELETE */}
                  <Button
                    p="0px"
                    bg="transparent"
                    onClick={() => onDelete(doctor.id)}
                    me="10px"
                  >
                    <Flex color="red.500" align="center">
                      <Icon as={FaTrashAlt} me="4px" />
                    </Flex>
                  </Button>

                  {/* EDIT */}
                  <Button
                    p="0px"
                    bg="transparent"
                    onClick={() => onEdit(doctor)}
                  >
                    <Flex color="blue.500" align="center">
                      <Icon as={FaPencilAlt} me="4px" />
                    </Flex>
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DoctorTable;

// import React from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Flex,
//   Text,
//   Button,
//   Icon,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// import { useHistory } from "react-router-dom";

// function DoctorTable({ hospitals, onEdit, onDelete }) {
//   const textColor = useColorModeValue("gray.600", "gray.300");
//   const titleColor = useColorModeValue("gray.700", "white");
//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const history = useHistory(); // 🔥 helper function to limit words
//   const limitWords = (text, limit = 20) => {
//     if (!text) return "-";
//     const words = text.split(" ");
//     if (words.length <= limit) return text;
//     return words.slice(0, limit).join(" ") + "...";
//   };

//   return (
//     <TableContainer>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th color={textColor} borderColor={borderColor}>
//               Hospital
//             </Th>
//             <Th color={textColor} borderColor={borderColor}>
//               Actions
//             </Th>
//           </Tr>
//         </Thead>

//         <Tbody>
//           {hospitals?.map((hospital) => (
//             <Tr key={hospital.id}>
//               {/* Hospital Name + Description */}
//               <Td borderColor={borderColor}>
//                 <Flex direction="column">
//                   <Text
//                     fontWeight="bold"
//                     color={titleColor}
//                     cursor="pointer"
//                     _hover={{ textDecoration: "underline", color: "blue.500" }}
//                     onClick={() => {
//                       const selectedHospital = {
//                         id: hospital.id,
//                         name: hospital.name_en,
//                         description: hospital.description_en,
//                         image: hospital.image,
//                       };

//                       console.log("selectedHospital", selectedHospital);

//                       history.push({
//                         pathname: "/admin/doctorDetail",
//                         state: { hospital: selectedHospital }, // ✅ only selected item
//                       });
//                     }}
//                   >
//                     {hospital.name}
//                   </Text>

//                   <Text fontSize="sm" color="gray.400" mt="2px">
//                     {limitWords(hospital.description)}
//                   </Text>
//                 </Flex>
//               </Td>

//               {/* Actions */}
//               <Td borderColor={borderColor}>
//                 <Flex>
//                   <Button
//                     p="0px"
//                     bg="transparent"
//                     onClick={() => onDelete(hospital.id)}
//                     me="10px"
//                   >
//                     <Flex color="red.500" align="center">
//                       <Icon as={FaTrashAlt} me="4px" />
//                       <Text fontSize="sm" fontWeight="semibold">
//                         DELETE
//                       </Text>
//                     </Flex>
//                   </Button>

//                   <Button
//                     p="0px"
//                     bg="transparent"
//                     onClick={() => onEdit(hospital)}
//                   >
//                     <Flex color="blue.500" align="center">
//                       <Icon as={FaPencilAlt} me="4px" />
//                       <Text fontSize="sm" fontWeight="semibold">
//                         EDIT
//                       </Text>
//                     </Flex>
//                   </Button>
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default DoctorTable;
