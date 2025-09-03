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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
import PatientsTable from "components/Tables/PatientsTable";
import { apiCallSecureGet } from "utils/api";
import { apiUrl } from "utils/api";
import { apiCallUnsecureGet, apiCallSecureDelete } from "utils/api";
import { showError, showSucess } from "utils/toast";
function Patients() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef();

  useEffect(() => {
    patientsData();
  }, []);

  const patientsData = () => {
    apiCallUnsecureGet(
      apiUrl.contactUs,
      (response) => {
        console.log("Patients", response.list);
        setPatients(response.list);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedPatient.id);

    setDialogOpen(false);

    apiCallSecureDelete(
      apiUrl.contactUs,
      selectedPatient.id,
      (response) => {
        patientsData();
        showSucess(`${selectedPatient.name} deleted successfully!`);
      },
      (error) => {
        showError("Something went wrong. Try again!");
      }
    );
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Patients Table
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th pl="0px" borderColor={borderColor} color="gray.400">
                    Patients
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Mobile
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    About Health
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Report
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Date
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {patients.length > 0 ? (
                  patients.map((row, index, arr) => (
                    <PatientsTable
                      key={row.id || index}
                      id={row.id}
                      name={row.name || "Name not available"}
                      logo={row.logo || ""}
                      email={row.email || "Email not provided"}
                      subdomain={row.mobile || "Mobile number not available"}
                      status={row.status || "Status not available"}
                      date={
                        row.updated
                          ? new Date(row.updated).toISOString().split("T")[0]
                          : "No Data"
                      }
                      AboutHealth={
                        row.aboutHealth || "No health details provided"
                      }
                      report={row.report || null}
                      isLast={index === arr.length - 1}
                      onDeleteClick={() =>
                        handleDeleteClick({ id: row.id, name: row.name })
                      }
                    />
                  ))
                ) : (
                  <CardBody m={10}>
                    <Text fontSize="md" color="gray.500" fontWeight="bold">
                      No Patients Data Found
                    </Text>
                  </CardBody>
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* 🔹 Delete Confirmation Dialog */}
        <AlertDialog
          isOpen={isDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setDialogOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Patient
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete{" "}
                <Text as="span" fontWeight="bold">
                  {selectedPatient?.name}
                </Text>
                ? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </>
  );
}

export default Patients;
