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
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
import { showSucess, showError } from "utils/toast";
import EditHospital from "./EditHospital";
import HospitalTable from "components/Tables/HospitalTable";
import AddHospital from "./AddHospital";

function Hospitals() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { colorMode } = useColorMode();
  const {
    isOpen: isAddHospitalOpen,
    onOpen: openAddHospital,
    onClose: closeAddHospital,
  } = useDisclosure();

  const [Hospitals, setHospitals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isEditHospitalOpen, setIsEditHospitalOpen] = useState(false);
  const [editHospital, setEditHospital] = useState(null);

  const cancelRef = useRef();

  useEffect(() => {
    HospitalsData();
  }, []);

  const HospitalsData = () => {
    apiCallSecureGet(
      apiUrl.hospitalsList,
      (response) => {
        console.log("Hospitals", response.list);
        setHospitals(response.list || []);
      },
      (error) => {
        console.log("error", error);
        setHospitals([]);
      },
    );
  };

  const handleDeleteClick = (Hospital) => {
    console.log("btn clicked");
    setSelectedHospital(Hospital);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedHospital?.id) return;

    const url = `${apiUrl.deleteHospitals}?id=${selectedHospital.id}`;
    apiCallSecureDelete(
      apiUrl.deleteHospitals,
      selectedHospital.id,
      (response) => {
        console.log("Deleted successfully", response);
        showSucess("Hospital deleted successfully!");
        setIsOpen(false);
        setHospitals(response.list || []);
        HospitalsData();
      },
      (error) => {
        console.log("Delete error", error);
        showError(error || "something went wrong please try again");
        setIsOpen(false);
      },
    );
  };

  const handleEditClick = (Hospital) => {
    setEditHospital(Hospital);
    setIsEditHospitalOpen(true);
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Hospitals
              </Text>
              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddHospital}
              >
                ADD Hospital
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            {Hospitals.length > 0 ? (
              <HospitalTable
                hospitals={Hospitals.map((hospital) => ({
                  id: hospital.id,
                  name: hospital.name_en,
                  description: hospital.description_en,
                  image: hospital.image,
                  location: hospital.location_en,
                }))}
                onDelete={(id) => {
                  console.log("Delete ID from table:", id);

                  const hospital = Hospitals.find(
                    (u) => Number(u.id) === Number(id),
                  );

                  console.log("Found hospital:", hospital);

                  if (hospital) {
                    handleDeleteClick(hospital);
                  }
                }}
                onEdit={(hospital) => {
                  const selected = Hospitals.find((u) => u.id === hospital.id);

                  if (selected) {
                    handleEditClick(selected);
                  }
                }}
              />
            ) : (
              <CardBody m={10}>
                <Text fontSize="md" color="gray.500" fontWeight="bold">
                  No Hospital Data Found
                </Text>
              </CardBody>
            )}
          </CardBody>
          {/*  */}

          {/*  */}
        </Card>
      </Flex>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Hospital
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>{selectedHospital?.name_en || ""}</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AddHospital
        isOpen={isAddHospitalOpen}
        onClose={closeAddHospital}
        onHospitalAdded={HospitalsData}
      />
      <EditHospital
        isOpen={isEditHospitalOpen}
        onClose={() => setIsEditHospitalOpen(false)}
        Hospital={editHospital}
        onHospitalUpdated={HospitalsData}
      />
    </>
  );
}

export default Hospitals;
