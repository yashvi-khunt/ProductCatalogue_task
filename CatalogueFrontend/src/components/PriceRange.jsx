import React from "react";

const PriceRange = ({ minPrice, maxPrice, onChange }) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-3 w-full">
      <label htmlFor="priceRange" className="mr-3 text-sm text-gray-600">
        Price Range
      </label>
      <input
        type="range"
        id="priceRange"
        min={0}
        max={5000}
        value={[minPrice, maxPrice]}
        className="cursor-pointer"
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="ml-2 text-gray-600">
        ${minPrice} - ${maxPrice}
      </span>
    </div>
  );
};

export default PriceRange;
