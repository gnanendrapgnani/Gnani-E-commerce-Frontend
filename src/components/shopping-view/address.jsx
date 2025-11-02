import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "../../store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

function Address({selectedAddress,
setSelectedAddress}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEdidtedId, setCurrentEditedId] = useState(null)

  const handleMangeAddress = (event) => {
    event.preventDefault();

    if(addressList.length >= 3 && currentEdidtedId ===null ){
      toast.error("You Can add maax 3 Address");
      return;
    }

    currentEdidtedId !== null ? dispatch(editAddress({userId:user?.id, addressId: currentEdidtedId, formData})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddress(user?.id))
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast.success("Address Edited Successfully")
      }
    }):

    dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
      if (data?.payload.success) {
        toast.success("Address add Successfully");
        dispatch(fetchAllAddress(user?.id));
        setFormData(initialAddressFormData);
      }
    });
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  function handleDeleteAddress (getCurrentAddress) {
    console.log(getCurrentAddress)
    console.log(getCurrentAddress?.userId, getCurrentAddress?._id)
    dispatch(deleteAddress({userId:user?.id, addressId:getCurrentAddress?._id})).then((data)=>{
        console.log(data.payload);
        if(data?.payload.success){
        dispatch(fetchAllAddress(user?.id));
        }
    })
  }

  function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({...formData,   
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem?._id}
                addressInfo={singleAddressItem}
                handleAddressDelete={handleDeleteAddress}
                handleEditAddress = {handleEditAddress}
                selectedAddress={selectedAddress}
setSelectedAddress = {setSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currentEdidtedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFromData={setFormData}
          buttonText={currentEdidtedId !== null ? "Edit" : "Add"}
          onSubmit={handleMangeAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
