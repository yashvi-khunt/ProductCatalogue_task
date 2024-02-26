import React, { useEffect, useState } from "react";
import { AddToWishListBtn, ZoomComponent } from "./index";
import { IoClose } from "react-icons/io5";
import apiService from "../api/apiService";
import "./product.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function ProductDetail({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const { success, data } = await apiService.getProductById(productId);
      console.log(data.tags);
      const images = data.images.map((image) => (
        <ZoomComponent
          src={image.imagePath}
          className={"h-full object-cover"}
        />
      ));
      setItems(images);

      if (success) setProduct(data);
    };
    getProduct();
  }, [productId]);

  return (
    <>
      {product && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
          <div className="card">
            <nav>
              <IoClose size={22} onClick={onClose} className="cursor-pointer" />
            </nav>
            <div className="photo">
              <AliceCarousel disableButtonsControls items={items} />
            </div>
            <div className="description">
              <h2>{product.name}</h2>
              <h4 className="flex gap-1 justify-center">
                {product.tags.map((tag) => (
                  <label key={tag.id}>{tag.name}</label>
                ))}
              </h4>
              <h1>Rs. {product.price}</h1>
              <p>{product.description}</p>
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
      )}
    </>
  );
}

export default ProductDetail;
