import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, fetchCartItems, updateCartQuantity } from "../../store/shop/cart";
import { toast } from "sonner";

function UserCartItemsContent({ cartItems }) {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  console.log(cartItems);

  const handleCartItemDelete = (items) =>{
    console.log(items.productId, user?.id);

    dispatch(deleteCartItems({userId: user?.id, productId:items.productId})).then((data)=>{
      
      if(data.payload.success){
        dispatch(fetchCartItems(user?.id))
      }
    })
  }

  const handleUpdateQuantity = async(items, typeAction)=>{
    dispatch(updateCartQuantity({userId: user?.id, productId: items?.productId, quantity: typeAction === "plus" ? items?.quantity + 1 : items?.quantity - 1} )).then((data)=> {
      if(data.payload.success){
        toast.success("Cart Item is updated successfully")
      }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3>{cartItems?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            className="w-8 h-8 rounded-full"
            variant="outline"
            size="icon"
            disabled = {cartItems?.quantity === 1}
            onClick={()=>handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only"> Decrease</span>
          </Button>

          <span className="font-semibold">{cartItems?.quantity}</span>

          <Button
            className="w-8 h-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={()=>handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only"> Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={()=>handleCartItemDelete(cartItems)} className="cursor-pointer mt-1" size={20} />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
