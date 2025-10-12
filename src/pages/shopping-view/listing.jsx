import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortoptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { fetchAllFilterdProdut } from "../../store/shop/product-slice";
import {  useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParmes){
  const querParms = [];
  for(const [key, value] of Object.entries(filterParmes)){
    if (Array.isArray(value) && value.length > 0){
      const paramValue = value.join(",")
      querParms.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return querParms.join("&")
}


function ShoppingList() {

  
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()

  console.log(productList, filters, searchParams)

  function handleSort(value){
    console.log(value);
    setSort(value)
  }

  function handlefilter (getSectionId, getCurrentOption){
    console.log(getSectionId, getCurrentOption)
    let cpyFilter = {...filters}
    const indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId)

    if (indexOfCurrentSection === -1){
      cpyFilter={
        ...cpyFilter,
        [getSectionId]:[getCurrentOption]
      }
    }else{
      const indexOfCurrentOption = cpyFilter[getSectionId].indexOf(getCurrentOption);
      if(indexOfCurrentOption === -1){
        cpyFilter[getSectionId].push(getCurrentOption)
      } else{
        cpyFilter[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }

    console.log(cpyFilter);
    setFilters(cpyFilter);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilter))
  }

  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  },[])

  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(() => {
    if(filters !==null && sort !== null){
      console.log("lsist",filters, sort)
    dispatch(fetchAllFilterdProdut({filterParams:filters, sortParams:sort}));
  }
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handlefilter}  />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold">All Product</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortoptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
