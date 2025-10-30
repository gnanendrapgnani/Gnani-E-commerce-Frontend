import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const initialFormData={
    status:""
}

const AdminOrderDetailsView = () => {

    const [formData, setFromdata] = useState(initialFormData);

    function handleUpdateStatus(event){
        event.preventDefault()
    }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>1234</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>27-10-2002</Label>
          </div>

          <div className="flex  items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>Price</Label>
          </div>

          <div className="flex  items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>InProgrss</Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>

            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>₹ 799</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Gnani</span>
              <span>Addrss</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <div className="">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "category",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFromData={setFromdata}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
