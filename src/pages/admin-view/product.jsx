import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../store/admin/product-slice";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

const initialFromData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStocks: "",
};

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [fromData, setFromData] = useState(initialFromData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, fromData })).then(
          (data) => {
            // console.log(data, "edtited ");
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFromData(initialFromData);
              setOpenCreateProductDialog(false);
              currentEditedId(null);
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...fromData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          // console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductDialog(false);
            setImageFile(null);
            setFromData(initialFromData);
            toast.success("Product added Successfully");
          }
        });
  }

  function handleDelete(getCurrentProductID) {
    console.log(getCurrentProductID);
    dispatch(deleteProduct(getCurrentProductID)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFromValid() {
    return Object.keys(fromData)
      .map((key) => fromData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log(productList, "fromData");

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                product={productItem}
                setFromData={setFromData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFromData(initialFromData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-5">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setIsLoadingImage={setIsLoadingImage}
            isLoadingImage={isLoadingImage}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={fromData}
              setFromData={setFromData}
              buttonText={currentEditedId !== null ? "Edit" : "ADD"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFromValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
