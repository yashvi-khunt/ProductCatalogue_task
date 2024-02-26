import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminApi from "../../api/adminApi";
import { ProductDetail } from "../index";
import Swal from "sweetalert2";
import { IoMenuOutline } from "react-icons/io5";
import NavToggle from "./NavToggle";

const columns = ["Id", "Logo", "Product Name", "Price", "Action"];

function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { success, data } = await adminApi.fetchProductList();
      console.log(products);
      if (success) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await adminApi.deleteProduct(id);
          if (result) {
            Swal.fire(
              "Deleted!",
              "Product has been deleted successfully.",
              "success"
            );
            // Update the products list after successful deletion
            const updatedProducts = products.filter(
              (product) => product.id !== id
            );
            setProducts(updatedProducts);
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the product.",
            "error"
          );
        }
      }
    });
  };
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const [product, setProduct] = useState(null);

  const toggleProductDetail = (pr) => {
    setShowProductDetail(!showProductDetail);
    setProduct(pr);
  };

  const toggleNavbar = (pr) => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      <div className="pt-5 px-6 flex justify-between items-center lg:justify-end">
        <button
          type="button"
          className=" p-2 text-gray-400 hover:text-gray-500 lg:hidden border rounded-lg bg-white"
          onClick={toggleNavbar}
        >
          <span className="sr-only">Tags</span>
          <IoMenuOutline size={25} />
        </button>
        <Link
          to={"./add"}
          className="text-sm p-2 rounded-lg bg-orange-400 text-white"
        >
          Add Product
        </Link>
      </div>
      <div className="p-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {columns.map((item) => (
                <th key={item} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className="odd:bg-white  even:bg-gray-50  border-t "
                >
                  <td scope="row" className="px-6 py-4 ">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img src={product.primaryImage} className="w-12" />
                  </td>
                  <td className="px-6 py-4 hover:underline">
                    <label onClick={() => toggleProductDetail(product.id)}>
                      {product.name}
                    </label>
                  </td>
                  <td className="px-6 py-4">Rs.{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        to={`./edit/${product.id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-blue-600  hover:underline"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showProductDetail && (
        <ProductDetail productId={product} onClose={toggleProductDetail} />
      )}
      {showNavbar && <NavToggle onClose={toggleNavbar} />}
    </>
  );
}

export default Product;
