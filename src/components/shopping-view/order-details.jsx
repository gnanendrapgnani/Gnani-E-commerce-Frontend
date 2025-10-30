import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";



const ShopOrderDetaisView = () => {



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


      </div>
    </DialogContent>
  );
};

export default ShopOrderDetaisView;
