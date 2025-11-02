import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button';

function AddressCard({addressInfo, handleAddressDelete, handleEditAddress, selectedAddress,
setSelectedAddress}) {

  return (
        <Card onClick = {setSelectedAddress ? ()=>{setSelectedAddress(addressInfo)}:null}>
            <CardContent className="grid gap-4">
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Phone Number: {addressInfo?.phone}</Label>
                <Label>Pincode: {addressInfo?.pincode}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>

            <CardFooter className="px-3 flex justify-between items-center">
              <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
              <Button onClick={()=>handleAddressDelete(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
  )
}

export default AddressCard;