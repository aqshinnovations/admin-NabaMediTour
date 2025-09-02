import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const RoleSelect = ({ value, onChange, label = "Role" }) => {
  return (
    <FormControl mb={4}>
      <FormLabel fontSize="sm" fontWeight="normal">
        {label}
      </FormLabel>
      <Select placeholder="Select role" value={value} onChange={onChange}>
        <option value="A">Admin</option>
        <option value="S">Superadmin</option>
        <option value="U">User</option>
      </Select>
    </FormControl>
  );
};

export default RoleSelect;
