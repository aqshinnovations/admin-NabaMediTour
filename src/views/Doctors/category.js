import React, { useState, useEffect } from "react";

import SelectAndAddItem from "components/SelectAndAddItem";
import { apiCallSecureGet, apiUrl } from "utils/api";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    CategoryList();
  }, []);

  const CategoryList = () => {
    apiCallSecureGet(
      apiUrl.Category,
      (response) => {
        console.log("Category", response.list);

        setCategories(response.list || []);
      },
      (error) => {
        console.log("error", error);
        setCategories([]);
      },
    );
  };

  const handleAddCategory = (category) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  return (
    <>
      <SelectAndAddItem
        items={categories}
        selectedItems={selectedCategories}
        onAdd={handleAddCategory}
        placeholder="Select Category"
        getItemId={(item) => item.id}
        getItemLabel={(item) => `${item.name_en} - ${item.name_ar}`}
      />
    </>
  );
};

export default Category;
