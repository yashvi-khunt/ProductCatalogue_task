import React, { useEffect, useState } from "react";
import { AddToWishListBtn, ZoomComponent } from "./index";
import { IoClose } from "react-icons/io5";
import apiService from "../api/apiService";

function ProductDetail({ productId, onClose }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const prod = await apiService.getProductById(productId);
      console.log(prod);
      setProduct(prod);
    };
    getProduct();
  }, [productId]);

  return (
    <>
      {product && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
          <div className="relative flex lg:w-1/2 sm:w-3/4 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 gap-3">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <IoClose />
            </button>
            <div className="h-60 w-fit">
              <ZoomComponent
                src={product.images[0].imagePath}
                className={"h-full object-cover"}
              />
            </div>
            <div className=" flex flex-col justify-between h-56">
              <div className="flex justify-between items-center px-2 mt-3">
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="">Rs.{product.price}</div>
              </div>
              <div>{product.description}</div>
              <div>
                <AddToWishListBtn
                  productId={product.id}
                  text
                  className={
                    " flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
