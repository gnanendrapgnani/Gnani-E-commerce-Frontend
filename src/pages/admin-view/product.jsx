import { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config";

const initialFromData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [fromData, setFromData] = useState(initialFromData);

  function onSubmit() {}

  return (
    <Fragment>
      <div className=" mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto px-5">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={fromData}
              setFromData={setFromData}
              buttonText="ADD"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
