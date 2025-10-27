import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content'
import { useNavigate } from 'react-router-dom'

function UserCartWrapper({cartItems, setOpenCartSheet}) {
    const navigate = useNavigate()
    
   const totalCartAmount = cartItems && cartItems.length > 0
  ? cartItems.reduce((sum, currentItem) => {
      return sum + (currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price);
    }, 0) // initial value 0
  : 0;
 

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
                <span className='font-bold'>₹ {totalCartAmount} </span>
            </div>
        </div> 
        <Button onClick={()=>{navigate('/shop/checkout');
            setOpenCartSheet(false)
        }} className="w-full mt-6">
            Check out
        </Button>
    </SheetContent>
  )
}

export default UserCartWrapper