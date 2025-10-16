import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content'

function UserCartWrapper({cartItems}) {
    

  return (
    <SheetContent className="sm:max-w-md p-4">
        <SheetHeader >
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4 overflow-y-auto scroll-smooth'>
            {
                cartItems && cartItems.length > 0 ? cartItems.map(Item=><UserCartItemsContent cartItems={Item} /> ): null
            }
        </div>

        <div className='mt-8 space-y-4'>
            <div className="flex justify-between">
                <span className='font-bold'>Total</span>
                <span className='font-bold'>₹ 1000 </span>
            </div>
        </div> 
        <Button className="w-full mt-6">
            Check out
        </Button>
    </SheetContent>
  )
}

export default UserCartWrapper