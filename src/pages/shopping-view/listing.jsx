import React from "react";
import ProductFilter from "../../components/filter";

function ShoppingList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
    </div>
  );
}

export default ShoppingList;
