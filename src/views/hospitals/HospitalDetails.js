import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  Flex,
  Text,
  Button,
  useColorMode,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
import AddFacility from "./components/Facilities/addFacilities";
import UpdateFacility from "./components/Facilities/updateFacilities";
import FacilityList from "./components/Facilities/FacilityList";
import SpecialtyList from "./components/Specialties/SpecialtyList";
import AddSpecialty from "./components/Specialties/addSpecialties";
import UpdateSpecialty from "./components/Specialties/updateSpecialties";
import ProcedureList from "./components/Procedures/ProcedureList";
import AddProcedure from "./components/Procedures/addProcedures";
import UpdateProcedure from "./components/Procedures/updateProcedures";
import DoctorList from "./components/Doctors/DoctorList";
import AddDoctor from "./components/Doctors/addDoctor";
import UpdateDoctor from "./components/Doctors/updateDoctor";
function HospitalDetails() {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const {
    isOpen: isFacilityOpen,
    onOpen: onFacilityOpen,
    onClose: onFacilityClose,
  } = useDisclosure();
  const {
    isOpen: isSpecialtyOpen,
    onOpen: onSpecialtyOpen,
    onClose: onSpecialtyClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateFacilityOpen,
    onOpen: onUpdateFacilityOpen,
    onClose: onUpdateFacilityClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateSpecialtyOpen,
    onOpen: onUpdateSpecialtyOpen,
    onClose: onUpdateSpecialtyClose,
  } = useDisclosure();

  const {
    isOpen: isProcedureOpen,
    onOpen: onProcedureOpen,
    onClose: onProcedureClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateProcedureOpen,
    onOpen: onUpdateProcedureOpen,
    onClose: onUpdateProcedureClose,
  } = useDisclosure();

  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const {
    isOpen: isDoctorOpen,
    onOpen: onDoctorOpen,
    onClose: onDoctorClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateDoctorOpen,
    onOpen: onUpdateDoctorOpen,
    onClose: onUpdateDoctorClose,
  } = useDisclosure();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const cancelRef = React.useRef();
  const hospital = location.state?.hospital;
  const { id } = useParams();
  const [hospitalID, setHospitalID] = useState(id);
  const [hospitalDetails, setHospitalDetails] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  console.log("Hospital Data:", hospital);

  useEffect(() => {
    if (hospital?.id) {
      setHospitalID(hospital.id);
      localStorage.setItem("hospitalID", hospital.id);
    } else {
      const storedId = localStorage.getItem("hospitalID");
      if (storedId) setHospitalID(storedId);
    }
  }, [hospital]);
  useEffect(() => {
    if (!hospitalID) return;

    HospitalsData();
  }, [hospitalID]);

  const HospitalsData = () => {
    if (!hospitalID) return;

    apiCallSecureGet(
      `${apiUrl.HospitalDetails}?hospital_id=${hospitalID}`,
      (response) => {
        console.log("Hospitals", response.data);
        setHospitalDetails(response.data);
      },
      (error) => {
        console.log("error", error);
      },
    );
  };

  // const handleDeleteClick = (facility) => {
  //   setSelectedFacility(facility);
  //   onDeleteOpen();
  // };
  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    onUpdateDoctorOpen();
  };
  const handleDeleteDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setDeleteType("doctor");
    onDeleteOpen();
  };
  const handleEditFacility = (facility) => {
    setSelectedFacility(facility);
    onUpdateFacilityOpen();
  };
  const handleEditSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
    onUpdateSpecialtyOpen();
  };
  const handleDeleteFacility = () => {
    if (!selectedFacility?.id) return;

    apiCallSecureDelete(
      apiUrl.Facility,
      selectedFacility.id,
      (response) => {
        console.log("Facility deleted:", response);

        onDeleteClose();
        setSelectedFacility(null);

        // Refresh hospital details
        HospitalsData();
      },
      (error) => {
        console.log("Delete facility error:", error);
      },
    );
  };

  const handleEditProcedure = (procedure) => {
    setSelectedProcedure(procedure);
    onUpdateProcedureOpen();
  };

  const handleDeleteProcedureClick = (procedure) => {
    setSelectedProcedure(procedure);
    setDeleteType("procedure");
    onDeleteOpen();
  };

  const handleDeleteSpecialty = () => {
    if (!selectedSpecialty?.id) return;

    apiCallSecureDelete(
      apiUrl.Specialty,
      selectedSpecialty.id,
      (response) => {
        console.log("Specialty deleted:", response);

        onDeleteClose();
        setSelectedSpecialty(null);

        // Refresh hospital details
        HospitalsData();
      },
      (error) => {
        console.log("Delete specialty error:", error);
      },
    );
  };

  const handleDeleteClick = (facility) => {
    setSelectedFacility(facility);
    setDeleteType("facility");
    onDeleteOpen();
  };

  const handleDeleteSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setDeleteType("specialty");
    onDeleteOpen();
  };

  const handleDelete = () => {
    if (deleteType === "facility") {
      if (!selectedFacility?.id) return;

      apiCallSecureDelete(
        apiUrl.Facility,
        selectedFacility.id,
        (response) => {
          console.log("Facility deleted:", response);

          onDeleteClose();
          setSelectedFacility(null);
          setDeleteType(null);

          HospitalsData();
        },
        (error) => {
          console.log("Delete facility error:", error);
        },
      );
    }

    if (deleteType === "specialty") {
      if (!selectedSpecialty?.id) return;

      apiCallSecureDelete(
        apiUrl.Specialty,
        selectedSpecialty.id,
        (response) => {
          console.log("Specialty deleted:", response);

          onDeleteClose();
          setSelectedSpecialty(null);
          setDeleteType(null);

          HospitalsData();
        },
        (error) => {
          console.log("Delete specialty error:", error);
        },
      );
    }
    if (deleteType === "procedure") {
      if (!selectedProcedure?.id) return;

      apiCallSecureDelete(
        apiUrl.Procedure,
        selectedProcedure.id,
        (response) => {
          console.log("Procedure deleted:", response);

          onDeleteClose();
          setSelectedProcedure(null);
          setDeleteType(null);

          // Refresh hospital details
          HospitalsData();
        },
        (error) => {
          console.log("Delete procedure error:", error);
        },
      );
    }
    if (deleteType === "doctor") {
      if (!selectedDoctor?.id) return;

      apiCallSecureDelete(
        apiUrl.hospitalsDoctors,
        selectedDoctor.id,
        (response) => {
          console.log("Doctor deleted:", response);

          onDeleteClose();
          setSelectedDoctor(null);
          setDeleteType(null);

          HospitalsData();
        },
        (error) => {
          console.log("Delete doctor error:", error);
        },
      );
    }
  };
  const renderSection = (title, data, extraFields = []) => {
    if (!data || data.length === 0) {
      return (
        <Card mb="20px" p="15px">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
          </CardHeader>
          <CardBody>
            <Text>No Data Found</Text>
          </CardBody>
        </Card>
      );
    }

    return (
      <Card mb="20px" p="15px">
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </CardHeader>

        <CardBody>
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid hsla(44, 15%, 25%, 0.40)",
                borderRadius: "16px",
                margin: "8px",
                padding: "12px",
              }}
            >
              <CardHeader pb="5px">
                <Text fontWeight="bold">{item.name}</Text>
              </CardHeader>

              <CardBody>
                {item.description && <Text mb="5px">{item.description}</Text>}

                {/* Extra fields like designation */}
                {extraFields.map((field) =>
                  item[field] ? (
                    <Text key={field}>
                      <b>{field}:</b> {item[field]}
                    </Text>
                  ) : null,
                )}
              </CardBody>
            </div>
          ))}
        </CardBody>
      </Card>
    );
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <div>
            <h2>Hospital Details</h2>

            <>
              {hospitalDetails ? (
                <>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between", // مهم
                        alignItems: "flex-start",
                        gap: "20px",
                        padding: "20px",
                        margin: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // 👈 added
                        borderRadius: "16px",
                      }}
                    >
                      {/* LEFT SIDE (Image + Details) */}
                      <div style={{ display: "flex", gap: "20px" }}>
                        {/* Image */}
                        <img
                          src={hospitalDetails.image}
                          alt="hospital"
                          style={{
                            width: "50%",
                            borderRadius: "10px",
                            objectFit: "cover",
                            border: "1px solid black",
                          }}
                        />

                        {/* Details */}
                        <div style={{ padding: 10 }}>
                          <p>
                            <span
                              style={{ fontWeight: "700", fontSize: "24px" }}
                            >
                              {hospitalDetails.name_en}
                            </span>
                          </p>

                          <p>{hospitalDetails.description_en}</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row", // ✅ row instead of column
                              gap: "15px",
                              alignItems: "center",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* RIGHT SIDE (Buttons) */}
                    </div>

                    {/*  */}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Facilities
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onFacilityOpen}
                      >
                        Add Facilities
                      </Button>
                    </Flex>
                    <FacilityList
                      facilities={hospitalDetails.facilities}
                      onEdit={handleEditFacility}
                      onDelete={handleDeleteClick}
                    />
                    {/* Specialties */}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Specialties
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onSpecialtyOpen}
                      >
                        Add Specialties
                      </Button>
                    </Flex>
                    <SpecialtyList
                      Specialties={hospitalDetails.specializations}
                      onEdit={handleEditSpecialty}
                      onDelete={handleDeleteSpecialtyClick}
                    />
                    {/*  Procedures*/}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Procedures
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onProcedureOpen}
                      >
                        Add Procedures
                      </Button>
                    </Flex>

                    <ProcedureList
                      procedures={hospitalDetails.procedures}
                      onEdit={handleEditProcedure}
                      onDelete={handleDeleteProcedureClick}
                    />
                    {/*  Doctors*/}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Doctors
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onDoctorOpen}
                      >
                        Add Doctors
                      </Button>
                    </Flex>

                    <DoctorList
                      doctors={hospitalDetails.doctors}
                      onEdit={handleEditDoctor}
                      onDelete={handleDeleteDoctorClick}
                    />
                    {/*  */}
                  </CardBody>
                </>
              ) : (
                <p>No Data</p>
              )}
            </>
          </div>
        </CardHeader>
      </Card>
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete{" "}
              {deleteType === "specialty"
                ? "Specialty"
                : deleteType === "procedure"
                ? "Procedure"
                : deleteType === "doctor"
                ? "Doctor"
                : "Facility"}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>
                {deleteType === "specialty"
                  ? selectedSpecialty?.name_en
                  : deleteType === "procedure"
                  ? selectedProcedure?.name_en
                  : deleteType === "doctor"
                  ? selectedDoctor?.name_en
                  : selectedFacility?.name_en}
              </b>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>

              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AddFacility
        isOpen={isFacilityOpen}
        onClose={onFacilityClose}
        hospitalId={hospitalID}
        onSuccess={() => {
          HospitalsData();
          onFacilityClose();
        }}
      />
      <AddSpecialty
        isOpen={isSpecialtyOpen}
        onClose={onSpecialtyClose}
        hospitalId={hospitalID}
        onSuccess={() => {
          HospitalsData();
          onSpecialtyClose();
        }}
      />
      <AddProcedure
        isOpen={isProcedureOpen}
        onClose={onProcedureClose}
        hospitalId={hospitalID}
        onSuccess={() => {
          HospitalsData();
          onProcedureClose();
        }}
      />
      <AddDoctor
        isOpen={isDoctorOpen}
        onClose={onDoctorClose}
        hospitalId={hospitalID}
        onSuccess={() => {
          HospitalsData();
          onDoctorClose();
        }}
      />
      <UpdateFacility
        isOpen={isUpdateFacilityOpen}
        onClose={() => {
          onUpdateFacilityClose();
          setSelectedFacility(null);
        }}
        facility={selectedFacility}
        hospitalId={hospitalID}
        onSuccess={() => {
          setSelectedFacility(null);
          HospitalsData();
        }}
      />
      <UpdateSpecialty
        isOpen={isUpdateSpecialtyOpen}
        onClose={() => {
          onUpdateSpecialtyClose();
          setSelectedSpecialty(null);
        }}
        specialty={selectedSpecialty}
        hospitalId={hospitalID}
        onSuccess={() => {
          setSelectedSpecialty(null);
          onUpdateSpecialtyClose();
          HospitalsData();
        }}
      />
      <UpdateProcedure
        isOpen={isUpdateProcedureOpen}
        onClose={() => {
          onUpdateProcedureClose();
          setSelectedProcedure(null);
        }}
        procedure={selectedProcedure}
        hospitalId={hospitalID}
        onSuccess={() => {
          setSelectedProcedure(null);
          onUpdateProcedureClose();
          HospitalsData();
        }}
      />
      <UpdateDoctor
        isOpen={isUpdateDoctorOpen}
        onClose={() => {
          onUpdateDoctorClose();
          setSelectedDoctor(null);
        }}
        doctor={selectedDoctor}
        hospitalId={hospitalID}
        onSuccess={() => {
          setSelectedDoctor(null);
          onUpdateDoctorClose();
          HospitalsData();
        }}
      />
    </Flex>
  );
}

export default HospitalDetails;
