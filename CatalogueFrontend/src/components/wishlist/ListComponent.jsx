import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import apiService from "../../api/apiService";
import { AddToWishListBtn, ProductDetail } from "../index";

function ListComponent({ onClose }) {
  const wishedProductIds = useSelector((state) => state.wishlist.list);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [product, setProduct] = useState(null);

  const toggleProductDetail = () => {
    setShowProductDetail(!showProductDetail);
  };
  const handleClick = (product) => {
    setProduct(product);
    toggleProductDetail();
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await apiService.fetchWishedProducts(wishedProductIds);
      if (data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, [wishedProductIds]);

  const handlePdf = async () => {
    if (wishedProductIds.length == 0) {
      alert("No products to create pdf");
    } else {
      await apiService.downloadPdf(wishedProductIds);
    }
  };

  useEffect(() => {
    console.log(products, wishedProductIds);
  }, [products]);

  return (
    <>
      {" "}
      <div className="absolute inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="flex h-full flex-col bg-white shadow-xl overflow-y-scroll min-w-80">
            <div className="flex-1 px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between  ">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Wishlist
                </h2>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <IoClose />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-200 ">
                    {wishedProductIds.length > 0 ? (
                      products.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.primaryImage}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col items-end">
                            <h3
                              className="text-base  font-medium text-gray-900 hover:underline"
                              onClick={() => handleClick(product)}
                            >
                              {product.name}
                            </h3>
                            <p className="ml-4 text-sm text-gray-800">
                              Rs.{product.price}
                            </p>

                            <div className="flex flex-1 items-end justify-center text-sm">
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium  hover:text-gray-500"
                                >
                                  <AddToWishListBtn
                                    productId={product.id}
                                    text
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <>
                        <label>Wishlist is empty!</label>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 flex gap-4 justify-between text-sm">
              <div className="">
                {products.length > 0 ? (
                  <a
                    onClick={handlePdf}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <label className="flex gap-2 justify-center items-center cursor-pointer">
                      <FaFilePdf />
                      Export Pdf
                    </label>
                  </a>
                ) : null}
              </div>
              <div className=" flex justify-center text-center text-sm text-gray-500">
                <p>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={onClose}
                  >
                    Continue Exploring
                    <span aria-hidden="true"> →</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showProductDetail && (
        <ProductDetail product={product} onClose={toggleProductDetail} />
      )}
    </>
  );
}

export default ListComponent;
