import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { ProductCard, TagsList } from "./index";
import { useSelector } from "react-redux";

function ProductList() {
  const [products, setProducts] = useState([]);
  const filterTags = useSelector((state) => state.filter.tags);
  const filterRange = useSelector((state) => state.filter.range);
  const filterText = useSelector((state) => state.filter.text);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await apiService.fetchProducts(
        filterTags,
        filterRange,
        filterText
      );
      console.log(products);
      setProducts(products);
    };
    fetchProducts();
  }, [filterTags, filterRange, filterText]);

  return (
    <div className="px-8">
      <TagsList>
        <div
          // className="my-4 mx-auto grid grid-cols-3 gap-x-8 gap-y-10 w-max"
          className="m-4 flex flex-1 flex-wrap gap-x-8 gap-y-10 justify-center"
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <label>No Products Found</label>
          )}
        </div>
      </TagsList>
    </div>
  );
}

export default ProductList;
