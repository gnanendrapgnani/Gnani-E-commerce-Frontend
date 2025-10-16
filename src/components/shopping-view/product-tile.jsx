import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionMap, categoryOptionMap } from "../../config";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm max-auto">
      <div onClick={()=>handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[150px]  object-cover "
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4 ">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg text-muted-foreground">
              {categoryOptionMap[product?.category]}
            </span>
            <span className="text-lg text-muted-foreground">
              {brandOptionMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg text-primary font-semibold ${
                product?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹ {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg text-primary font-semibold">
                ₹ {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
        <CardFooter>
          <Button onClick={()=>handleAddtoCart(product?._id)} className="w-full">Add to Cart</Button>
        </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
