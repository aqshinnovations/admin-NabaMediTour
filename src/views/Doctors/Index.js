import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
import { showSucess, showError } from "utils/toast";

import EditDoctor from "./EditDoctors";
import AddDoctors from "./AddDoctors";
import Category from "./category";
import DoctorTable from "components/Tables/DoctorTable";

function Doctors() {
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();

  const {
    isOpen: isAddDoctorOpen,
    onOpen: openAddDoctor,
    onClose: closeAddDoctor,
  } = useDisclosure();

  const [doctors, setDoctors] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [isEditDoctorOpen, setIsEditDoctorOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  const cancelRef = useRef();

  // =========================
  // GET DOCTORS
  // =========================
  useEffect(() => {
    doctorsData();
  }, []);

  const doctorsData = () => {
    apiCallSecureGet(
      apiUrl.DoctorsList,
      (response) => {
        console.log("Doctors:", response.list);

        setDoctors(response.list || []);
      },
      (error) => {
        console.log("Doctors error:", error);

        setDoctors([]);
      },
    );
  };

  // =========================
  // DELETE CLICK
  // =========================
  const handleDeleteClick = (doctor) => {
    console.log("Delete button clicked:", doctor);

    setSelectedDoctor(doctor);
    setIsOpen(true);
  };

  // =========================
  // CONFIRM DELETE
  // =========================
  const confirmDelete = () => {
    if (!selectedDoctor?.id) return;

    console.log("Deleting Doctor ID:", selectedDoctor.id);

    apiCallSecureDelete(
      apiUrl.Doctors,
      selectedDoctor.id,
      (response) => {
        console.log("Doctor deleted successfully:", response);

        showSucess("Doctor deleted successfully!");

        setIsOpen(false);
        setSelectedDoctor(null);

        // Refresh doctor list
        doctorsData();
      },
      (error) => {
        console.log("Delete doctor error:", error);

        showError(error || "Something went wrong, please try again");

        setIsOpen(false);
      },
    );
  };

  // =========================
  // EDIT CLICK
  // =========================
  const handleEditClick = (doctor) => {
    console.log("Edit Doctor:", doctor);

    setEditDoctor(doctor);
    setIsEditDoctorOpen(true);
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Doctors
              </Text>

              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddDoctor}
              >
                ADD Doctors
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            {doctors.length > 0 ? (
              <DoctorTable
                doctors={doctors.map((doctor) => ({
                  id: doctor.id,
                  name: doctor.name_en,
                  about: doctor.about_en,
                  image: doctor.image,
                }))}
                onDelete={(id) => {
                  console.log("Delete Doctor ID from table:", id);

                  const doctor = doctors.find(
                    (item) => Number(item.id) === Number(id),
                  );

                  console.log("Found doctor:", doctor);

                  if (doctor) {
                    handleDeleteClick(doctor);
                  }
                }}
                onEdit={(doctor) => {
                  const selected = doctors.find(
                    (item) => Number(item.id) === Number(doctor.id),
                  );

                  console.log("Selected doctor for edit:", selected);

                  if (selected) {
                    handleEditClick(selected);
                  }
                }}
              />
            ) : (
              <CardBody m={10}>
                <Text fontSize="md" color="gray.500" fontWeight="bold">
                  No Doctors Data Found
                </Text>
              </CardBody>
            )}
          </CardBody>
        </Card>
      </Flex>

      {/* =========================
          DELETE CONFIRMATION
      ========================= */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Doctor
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>{selectedDoctor?.name_en || ""}</b>?
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

      {/* =========================
          ADD DOCTOR
      ========================= */}
      <AddDoctors
        isOpen={isAddDoctorOpen}
        onClose={closeAddDoctor}
        onDoctorAdded={doctorsData}
      />

      {/* =========================
          EDIT DOCTOR
      ========================= */}
      <EditDoctor
        isOpen={isEditDoctorOpen}
        onClose={() => setIsEditDoctorOpen(false)}
        Doctor={editDoctor}
        onDoctorUpdated={doctorsData}
      />
    </>
  );
}

export default Doctors; // import React, { useEffect, useState, useRef } from "react";
// import {
//   Flex,
//   Table,
//   Tbody,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
//   Button,
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
//   useColorMode,
//   useDisclosure,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import TablesProjectRow from "components/Tables/TablesProjectRow";
// import TablesTableRow from "components/Tables/TablesTableRow";
// import { tablesProjectData, tablesTableData } from "variables/general";
// import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
// import { showSucess, showError } from "utils/toast";
// import EditHospital from "./EditDoctors";
// import HospitalTable from "components/Tables/DoctorTable";
// import AddDoctors from "./AddDoctors";
// import Category from "./category";
// import DoctorTable from "components/Tables/DoctorTable";

// function Doctors() {
//   const textColor = useColorModeValue("gray.700", "white");
//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const { colorMode } = useColorMode();
//   const {
//     isOpen: isAddHospitalOpen,
//     onOpen: openAddHospital,
//     onClose: closeAddHospital,
//   } = useDisclosure();

//   const [doctors, setDoctors] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedHospital, setSelectedHospital] = useState(null);
//   const [isEditHospitalOpen, setIsEditHospitalOpen] = useState(false);
//   const [editHospital, setEditHospital] = useState(null);

//   const cancelRef = useRef();

//   useEffect(() => {
//     HospitalsData();
//   }, []);

//   const HospitalsData = () => {
//     apiCallSecureGet(
//       apiUrl.DoctorsList,
//       (response) => {
//         console.log("Doctors", response.list);
//         setDoctors(response.list || []);
//       },
//       (error) => {
//         console.log("error", error);
//         setDoctors([]);
//       },
//     );
//   };

//   const handleDeleteClick = (Hospital) => {
//     console.log("btn clicked");
//     setSelectedHospital(Hospital);
//     setIsOpen(true);
//   };

//   const confirmDelete = () => {
//     if (!selectedHospital?.id) return;

//     const url = `${apiUrl.deleteHospitals}?id=${selectedHospital.id}`;
//     apiCallSecureDelete(
//       apiUrl.Doctors,
//       selectedHospital.id,
//       (response) => {
//         console.log("Deleted successfully", response);
//         showSucess("Hospital deleted successfully!");
//         setIsOpen(false);
//         setDoctors(response.list || []);
//         HospitalsData();
//       },
//       (error) => {
//         console.log("Delete error", error);
//         showError(error || "something went wrong please try again");
//         setIsOpen(false);
//       },
//     );
//   };

//   const handleEditClick = (Hospital) => {
//     setEditHospital(Hospital);
//     setIsEditHospitalOpen(true);
//   };

//   return (
//     <>
//       <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
//         <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
//           <CardHeader p="6px 0px 22px 0px">
//             <Flex align="center" justify="space-between" w="100%">
//               <Text fontSize="xl" color={textColor} fontWeight="bold">
//                 Doctors
//               </Text>
//               <Category />
//               <Button
//                 variant={colorMode === "primary" ? "dark" : "primary"}
//                 onClick={openAddHospital}
//               >
//                 ADD Doctors
//               </Button>
//             </Flex>
//           </CardHeader>

//           <CardBody>
//             {doctors.length > 0 ? (
//               <DoctorTable
//                 doctors={doctors.map((doctor) => ({
//                   id: doctor.id,
//                   name: doctor.name_en,
//                   about: doctor.about_en,
//                   image: doctor.image,
//                 }))}
//                 onDelete={(id) => {
//                   console.log("Delete Doctor ID from table:", id);

//                   const doctor = Doctors.find(
//                     (u) => Number(u.id) === Number(id),
//                   );

//                   console.log("Found doctor:", doctor);

//                   if (doctor) {
//                     handleDeleteClick(doctor);
//                   }
//                 }}
//                 onEdit={(doctor) => {
//                   const selected = Doctors.find(
//                     (u) => Number(u.id) === Number(doctor.id),
//                   );

//                   if (selected) {
//                     handleEditClick(selected);
//                   }
//                 }}
//               />
//             ) : (
//               // <HospitalTable
//               //   hospitals={Hospitals.map((hospital) => ({
//               //     id: hospital.id,
//               //     name: hospital.name_en,
//               //     description: hospital.about_en,
//               //     image: hospital.image,
//               //     location: hospital.location_en,
//               //   }))}
//               //   onDelete={(id) => {
//               //     console.log("Delete ID from table:", id);

//               //     const hospital = Hospitals.find(
//               //       (u) => Number(u.id) === Number(id),
//               //     );

//               //     console.log("Found hospital:", hospital);

//               //     if (hospital) {
//               //       handleDeleteClick(hospital);
//               //     }
//               //   }}
//               //   onEdit={(hospital) => {
//               //     const selected = Hospitals.find((u) => u.id === hospital.id);

//               //     if (selected) {
//               //       handleEditClick(selected);
//               //     }
//               //   }}
//               // />
//               <CardBody m={10}>
//                 <Text fontSize="md" color="gray.500" fontWeight="bold">
//                   No Doctors Data Found
//                 </Text>
//               </CardBody>
//             )}
//           </CardBody>
//           {/*  */}

//           {/*  */}
//         </Card>
//       </Flex>
//       {/* Delete Confirmation Dialog */}
//       <AlertDialog
//         isOpen={isOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={() => setIsOpen(false)}
//         isCentered
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Delete Doctors
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               Are you sure you want to delete{" "}
//               <b>{selectedHospital?.name_en || ""}</b>?
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
//                 Cancel
//               </Button>
//               <Button colorScheme="red" onClick={confirmDelete} ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>

//       <AddDoctors
//         isOpen={isAddHospitalOpen}
//         onClose={closeAddHospital}
//         onDoctorAdded={HospitalsData}
//       />
//       <EditHospital
//         isOpen={isEditHospitalOpen}
//         onClose={() => setIsEditHospitalOpen(false)}
//         Hospital={editHospital}
//         onHospitalUpdated={HospitalsData}
//       />
//     </>
//   );
// }

// export default Doctors;
