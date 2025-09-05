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
import EditUser from "./EditUser";

import AddUser from "./AddUser";

function Users() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { colorMode } = useColorMode();
  const {
    isOpen: isAddUserOpen,
    onOpen: openAddUser,
    onClose: closeAddUser,
  } = useDisclosure();

  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
const [isEditUserOpen, setIsEditUserOpen] = useState(false);
const [editUser, setEditUser] = useState(null);

  const cancelRef = useRef();

  useEffect(() => {
    UsersData();
  }, []);

  const UsersData = () => {
    apiCallSecureGet(
      apiUrl.Users,
      (response) => {
        console.log("users", response.list);
        setUsers(response.list);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleDeleteClick = (user) => {
    console.log("btn clicked");
    setSelectedUser(user);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser?.accountId) {
      apiCallSecureDelete(
        apiUrl.Users,
        selectedUser.accountId,
        (response) => {
          console.log("Deleted successfully", response);
          showSucess("User deleted successfully!");
          setIsOpen(false);
          setSelectedUser(null);
          UsersData();
        },
        (error) => {
          console.log("Delete error", error);
          showError(error || "something went wrong please try again");
          setIsOpen(false);
        }
      );
    }
  };

  const handleEditClick = (user) => {
  setEditUser(user);
  setIsEditUserOpen(true);
};

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" w="100%">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Users Table
              </Text>
              <Button
                variant={colorMode === "primary" ? "dark" : "primary"}
                onClick={openAddUser}
              >
                ADD NEW USER
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th pl="0px" borderColor={borderColor} color="gray.400">
                    Name
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Mobile
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Role
                  </Th>
                  <Th borderColor={borderColor} color="gray.400"></Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <TablesTableRow
                      key={user.accountId || index}
                      id={user.accountId}
                      logo={user.photo_url} // <-- Pass the image URL here
                      name={
                        `${user.first_name || ""} ${
                          user.last_name || ""
                        }`.trim() || "Name not available"
                      }
                      subdomain={user.mobile || "Mobile not available"}
                      email={user.email || "Email not available"}
                      status={user.role || "Role not provided"}
                      isLast={index === users.length - 1}
                      onDelete={() => handleDeleteClick(user)} 
                       onEdit={() => handleEditClick(user)} 
                    />
                  ))
                ) : (
                  <CardBody m={10}>
                    <Text fontSize="md" color="gray.500" fontWeight="bold">
                      No Users Data Found
                    </Text>
                  </CardBody>
                )}
              </Tbody>
            </Table>
          </CardBody>
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
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <b>{selectedUser?.first_name || ""}</b>?
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

      <AddUser
        isOpen={isAddUserOpen}
        onClose={closeAddUser}
        onUserAdded={UsersData}
      />
      <EditUser
  isOpen={isEditUserOpen}
  onClose={() => setIsEditUserOpen(false)}
  user={editUser}
  onUserUpdated={UsersData}
/>

    </>
  );
}

export default Users;
