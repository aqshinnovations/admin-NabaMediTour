import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { apiCallSecureGet, apiCallSecureDelete, apiUrl } from "utils/api";
import AddQualification from "./components/Qualifications/addQualification";
import UpdateQualification from "./components/Qualifications/updateQualification";
import FacilityList from "./components/Qualifications/qualificationsList";
import GalleryList from "./components/Gallery/galleryList";
import AddGallery from "./components/Gallery/addGallery";
import UpdateProcedure from "./components/Gallery/updateProcedures";
import QualificationsList from "./components/Qualifications/qualificationsList";
import { showError, showSucess } from "utils/toast";
import SpecializationsList from "./components/Specializations/specializationsList";
import AddSpecializations from "./components/Specializations/addSpecializations";
import UpdateSpecialization from "./components/Specializations/updateSpecialization";
import AwardsList from "./components/Awards/awardsList";
import UpdateAward from "./components/Awards/updateAwards";
import AddAward from "./components/Awards/addAwards";

function DoctorsDetails() {
  const { colorMode } = useColorMode();
  const {
    isOpen: isQualificationOpen,
    onOpen: onQualificationOpen,
    onClose: onQualificationClose,
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
    isOpen: isUpdateQualificationOpen,
    onOpen: onUpdateQualificationOpen,
    onClose: onUpdateQualificationClose,
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
  const {
    isOpen: isAwardOpen,
    onOpen: onAwardOpen,
    onClose: onAwardClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateAwardOpen,
    onOpen: onUpdateAwardOpen,
    onClose: onUpdateAwardClose,
  } = useDisclosure();

  const [selectedAward, setSelectedAward] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const cancelRef = React.useRef();

  const { id: doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  console.log("Doctor ID:", doctorId);
  console.log("Doctor ID:", doctorId);
  useEffect(() => {
    if (!doctorId) return;

    DoctorsData();
  }, [doctorId]);

  const DoctorsData = () => {
    apiCallSecureGet(
      `${apiUrl.DoctorsDetails}?id=${doctorId}`,
      (response) => {
        console.log("Doctor Details:", response.data);
        setDoctorDetails(response.data);
      },
      (error) => {
        console.log("Doctor Details Error:", error);
      },
    );
  };

  const handleEditAward = (award) => {
    setSelectedAward(award);
    onUpdateAwardOpen();
  };

  const handleDeleteAwardClick = (award) => {
    setSelectedAward(award);
    setDeleteType("award");
    onDeleteOpen();
  };
  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    onUpdateDoctorOpen();
  };
  const handleDeleteDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setDeleteType("doctor");
    onDeleteOpen();
  };
  const handleEditQualification = (qualification) => {
    setSelectedQualification(qualification);
    onUpdateQualificationOpen();
  };
  const handleEditSpecialty = (specialty) => {
    console.log("Selected Specialization ID:", specialty.id);

    setSelectedSpecialty(specialty);
    onUpdateSpecialtyOpen();
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
        DoctorsData();
      },
      (error) => {
        console.log("Delete specialty error:", error);
      },
    );
  };

  const handleDeleteQualificationClick = (qualification) => {
    setSelectedQualification(qualification);
    setDeleteType("qualification");
    onDeleteOpen();
  };

  const handleDeleteSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setDeleteType("specialty");
    onDeleteOpen();
  };

  const handleDelete = () => {
    if (deleteType === "qualification") {
      if (!selectedQualification?.id) return;

      apiCallSecureDelete(
        apiUrl.qualification,
        selectedQualification.id,
        (response) => {
          console.log("Qualification deleted:", response);
          showSucess("Qualification deleted successfully!");

          onDeleteClose();
          setSelectedQualification(null);
          setDeleteType(null);

          DoctorsData();
        },
        (error) => {
          console.log("Delete qualification error:", error);
          showError("Failed to delete qualification");
        },
      );

      return;
    }

    if (deleteType === "specialty") {
      if (!selectedSpecialty?.id) return;

      apiCallSecureDelete(
        apiUrl.doctorSpecializations,
        selectedSpecialty.id,
        (response) => {
          console.log("Specialty deleted:", response);

          onDeleteClose();
          setSelectedSpecialty(null);
          setDeleteType(null);

          DoctorsData();
        },
        (error) => {
          console.log("Delete specialty error:", error);
        },
      );
    }
    if (deleteType === "procedure") {
      if (!selectedProcedure?.id) return;

      apiCallSecureDelete(
        apiUrl.Gallery,
        selectedProcedure.id,
        (response) => {
          console.log("Procedure deleted:", response);
          showSucess("Image Deleted Successfully! ");

          onDeleteClose();
          setSelectedProcedure(null);
          setDeleteType(null);

          // Refresh hospital details
          DoctorsData();
        },
        (error) => {
          console.log("Delete procedure error:", error);
          showSucess(error || "Something went wrong");
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

          DoctorsData();
        },
        (error) => {
          console.log("Delete doctor error:", error);
        },
      );
    }
    if (deleteType === "award") {
      if (!selectedAward?.id) return;

      apiCallSecureDelete(
        apiUrl.doctorAwards,
        selectedAward.id,
        (response) => {
          console.log("Award deleted:", response);

          onDeleteClose();
          setSelectedAward(null);
          setDeleteType(null);

          DoctorsData();
        },
        (error) => {
          console.log("Delete award error:", error);
          showError("Failed to delete award");
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
                {item.about_en && <Text mb="5px">{item.about_en}</Text>}

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
            <h2>Doctor Detail</h2>

            <>
              {doctorDetails ? (
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
                          src={doctorDetails.image}
                          alt="doctor"
                          style={{
                            width: "200px",
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
                              {doctorDetails.name_en}
                            </span>
                          </p>

                          <p>{doctorDetails.about_en}</p>
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
                        Qualifications
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onQualificationOpen}
                      >
                        Add Qualifications
                      </Button>
                    </Flex>
                    <QualificationsList
                      qualifications={doctorDetails.qualifications}
                      onEdit={handleEditQualification}
                      onDelete={handleDeleteQualificationClick}
                    />
                    {/* Specialties */}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Specializations
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onSpecialtyOpen}
                      >
                        Add Specializations
                      </Button>
                    </Flex>
                    <SpecializationsList
                      facilities={doctorDetails.specialists}
                      onEdit={handleEditSpecialty}
                      onDelete={handleDeleteSpecialtyClick}
                    />
                    {/*  */}
                    {/* Awards */}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Awards
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onAwardOpen}
                      >
                        Add Awards
                      </Button>
                    </Flex>

                    <AwardsList
                      awards={doctorDetails.awards}
                      onEdit={handleEditAward}
                      onDelete={handleDeleteAwardClick}
                    />
                    {/*  Procedures*/}
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="15px"
                      px="10px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Gallery
                      </Text>

                      <Button
                        variant={colorMode === "primary" ? "dark" : "primary"}
                        onClick={onProcedureOpen}
                      >
                        Add Gallery
                      </Button>
                    </Flex>

                    <GalleryList
                      procedures={doctorDetails.images}
                      onEdit={handleEditProcedure}
                      onDelete={handleDeleteProcedureClick}
                    />
                    {/*  Doctors*/}

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
                ? "Specialization"
                : deleteType === "procedure"
                ? "Gallery"
                : deleteType === "doctor"
                ? "Doctor"
                : deleteType === "award"
                ? "Award"
                : "Qualification"}
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
                  : deleteType === "award"
                  ? selectedAward?.name_en
                  : selectedQualification?.name_en}
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

      <AddGallery
        isOpen={isProcedureOpen}
        onClose={onProcedureClose}
        doctorId={doctorId}
        onSuccess={() => {
          DoctorsData();
          onProcedureClose();
        }}
      />

      <UpdateProcedure
        isOpen={isUpdateProcedureOpen}
        onClose={() => {
          onUpdateProcedureClose();
          setSelectedProcedure(null);
        }}
        procedure={selectedProcedure}
        doctorId={doctorId}
        onSuccess={() => {
          setSelectedProcedure(null);
          onUpdateProcedureClose();
          DoctorsData();
        }}
      />

      {/* Qaulification */}
      <AddQualification
        isOpen={isQualificationOpen}
        onClose={onQualificationClose}
        doctorId={doctorId}
        onSuccess={() => {
          DoctorsData();
          onQualificationClose();
        }}
      />
      <UpdateQualification
        isOpen={isUpdateQualificationOpen}
        onClose={() => {
          onUpdateQualificationClose();
          setSelectedQualification(null);
        }}
        facility={selectedQualification}
        doctorId={doctorId}
        onSuccess={() => {
          setSelectedQualification(null);
          DoctorsData();
        }}
      />

      {/* Specializations */}
      <AddSpecializations
        isOpen={isSpecialtyOpen}
        onClose={onSpecialtyClose}
        doctorId={doctorId}
        onSuccess={() => {
          DoctorsData();
          onSpecialtyClose();
        }}
      />
      <UpdateSpecialization
        isOpen={isUpdateSpecialtyOpen}
        onClose={() => {
          onUpdateSpecialtyClose();
          setSelectedSpecialty(null);
        }}
        specialization={selectedSpecialty}
        doctorId={doctorId}
        onSuccess={() => {
          setSelectedSpecialty(null);
          onUpdateSpecialtyClose();
          DoctorsData();
        }}
      />

      {/* Awards */}
      <AddAward
        isOpen={isAwardOpen}
        onClose={onAwardClose}
        doctorId={doctorId}
        onSuccess={() => {
          DoctorsData();
          onAwardClose();
        }}
      />
      <UpdateAward
        isOpen={isUpdateAwardOpen}
        onClose={() => {
          onUpdateAwardClose();
          setSelectedAward(null);
        }}
        award={selectedAward}
        doctorId={doctorId}
        onSuccess={() => {
          setSelectedAward(null);
          onUpdateAwardClose();
          DoctorsData();
        }}
      />
    </Flex>
  );
}

export default DoctorsDetails;
