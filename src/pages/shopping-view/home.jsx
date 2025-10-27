import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Codesandbox, Drum, Gitlab, Guitar, Notebook, ShirtIcon, Trello, UmbrellaIcon, WatchIcon } from "lucide-react"
import banner1 from "../../assets/banner-1.webp"
import banner2 from "../../assets/banner-2.webp"
import banner3 from "../../assets/banner-3.webp"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilterdProdut, fetchProdutDetails } from "../../store/shop/product-slice"
import ShoppingProductTile from "../../components/shopping-view/product-tile"
import { useNavigate } from "react-router-dom"
import { addToCart, fetchCartItems } from "../../store/shop/cart"
import { toast } from "sonner"
import ProductDetailsDilog from "../../components/shopping-view/product-details"

  const CategoryWithIcon = [
      { id: "men", label: "Men", icon: ShirtIcon }, 
      { id: "women", label: "Women", icon: CloudLightningIcon },
      { id: "kids", label: "Kids", icon: BabyIcon },
      { id: "accessories", label: "Accessories", icon: WatchIcon },
      { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
    ] 

    const brand = [
      { id: "nike", label: "Nike", icon: Trello },
      { id: "adidas", label: "Adidas", icon: Gitlab },
      { id: "puma", label: "Puma", icon: Codesandbox },
      { id: "levi", label: "Levi's", icon: Notebook },
      { id: "zara", label: "Zara", icon: Guitar },
      { id: "h&m", label: "H&M", icon: Drum  },
    ]

function ShoppingHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
// const  productList  = useSelector((state) => state);

  const [currentSlide, setCurrentSlide] = useState(0)

  const slide = [banner1, banner2, banner3];

    function handleNavigateToListPage(section,getCurrentItem){
   sessionStorage.removeItem("filters");
   const currentFilter = {
    [section]:[getCurrentItem]
   } 

   sessionStorage.setItem('filters', JSON.stringify(currentFilter));
   navigate("/shop/listing")
  }

    function handleGetProductDetails(getCurrentProductID) {
      dispatch(fetchProdutDetails(getCurrentProductID));
    }

    function handleAddtoCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is Added to Cart")
      }
    });
  }
  

  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide => (prevSlide + 1) % slide.length)
    }, 5000)

    return () => clearInterval(timer)
  },[])

  useEffect(()=>{
    dispatch(fetchAllFilterdProdut({filterParams : {}, sortParams: "price-lowtohigh"} ))
  },[dispatch]);


  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);


  return <div className="flex flex-col min-h-screen">
    <div className="relative w-full h-[600px] overflow-hidden" >
      {
        slide.map ((slide, index)=>(
          <img 
          src={slide}
          key = {index}
          className={`${index === currentSlide ? "opacity-100 " : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))
      }

      <Button onClick={()=>setCurrentSlide(prevSlide => (prevSlide - 1 + slide.length) % slide.length)} variant = "outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white">
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

          <Button onClick={()=>setCurrentSlide(prevSlide => (prevSlide + 1 + slide.length) % slide.length)} variant = "outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white">
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
      
    </div>

    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {
            CategoryWithIcon.map(item => <Card onClick={()=>handleNavigateToListPage("category",item.id)}  className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className= "flex flex-col items-center justify-center p-6" >
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>  
            </Card>)
          }
        </div>
      </div>
    </section>

     <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {
            brand.map(item => <Card onClick={()=>handleNavigateToListPage("brand",item.id)}  className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className= "flex flex-col items-center justify-center p-6" >
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>  
            </Card>)
          }
        </div>
      </div>
    </section>

    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Feature Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            productList && productList.length > 0 ?
            productList.map(productItem => <ShoppingProductTile
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />)
            : null
          }
        </div>
      </div>
    </section>

          <ProductDetailsDilog
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />

  </div>
}

export default ShoppingHome;
