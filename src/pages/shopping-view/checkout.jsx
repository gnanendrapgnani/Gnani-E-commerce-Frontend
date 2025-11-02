import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "../../components/shopping-view/address";
import UserCartItemsContent from "../../components/shopping-view/cart-items-content";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const dispatch = useDispatch()

const totalCartAmount =
  cartItems?.items && cartItems.items.length > 0
    ? cartItems.items.reduce((sum, currentItem) => {
        const price = currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price;
        const quantity = currentItem?.quantity || 1;
        return sum + price * quantity;
      }, 0)
    : 0;

  async function handleIntitialtePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ?singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo:{
        addressId: selectedAddress?._id,
        address:selectedAddress?.address,
        city:selectedAddress?.city,
        pincode:selectedAddress?.pincode,
        phone:selectedAddress?.phone,
        notes:selectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus:"pending",
      totalAmount: totalCartAmount,
      orderData: new Date(),
      orderUpdateDate: new Date(),
      paymentId:"",
      payerId:""
    };

    // console.log(orderData)
    dispatch(createNewOrder(orderData)).then((data)=>{
      if(data?.payload?.success){
        setIsPaymentStart(true);
      }else{
        setIsPaymentStart(false)
      }
    })
  }

  if(approvalURL){
    window.location.href = approvalURL
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt=""
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address selectedAddress={selectedAddress}
setSelectedAddress={setSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item?._id} cartItems={item} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹ {totalCartAmount} </span>
            </div>
            <div className="mt-4 w-full">
              <Button
                onClick={handleIntitialtePaypalPayment}
                className="w-full"
              >
                Checkout With Paypal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
