import React, { useState } from "react";
import { AddToWishListBtn, ProductDetail } from "./index";

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);

  const toggleProductDetail = () => {
    setShowProductDetail(!showProductDetail);
  };

  return (
    <>
      <div className="w-max flex flex-col justify-center border-2 rounded-lg">
        <div
          className="w-full flex justify-center relative border-b-2 "
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            className="h-80 rounded-sm"
            src={hovered ? product.secondaryImage : product.primaryImage}
          />
          <div className="absolute bottom-0 right-0 p-2">
            <AddToWishListBtn productId={product.id} />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-2">
          <div className="font-medium text-gray-400 text-sm">
            Rs.{product.price}
          </div>
          <div
            className="text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"
            onClick={toggleProductDetail}
          >
            {product.name}
          </div>
        </div>
      </div>

      {showProductDetail && (
        <ProductDetail productId={product.id} onClose={toggleProductDetail} />
      )}
    </>
  );
}

export default ProductCard;
