import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilter,
  clearFilters,
  removeFilter,
  changeRange,
  changeText,
} from "../store/filterSlice";
import RangeSlider from "rsuite/RangeSlider";
import "rsuite/dist/rsuite.css";

function FilterComponent({ onClose, tags }) {
  const dispatch = useDispatch();

  const filterTags = useSelector((state) => state.filter.tags);
  const filterMinPrice = useSelector((state) => state.filter.minPrice);
  const filterMaxPrice = useSelector((state) => state.filter.maxPrice);

  const handleTag = (tag) => {
    if (filterTags.includes(tag.id)) {
      dispatch(removeFilter({ tagId: tag.id }));
    } else {
      dispatch(addFilter({ tagId: tag.id }));
    }
  };

  const handlePriceRange = (values) => {
    dispatch(changeRange({ minPrice: values[0], maxPrice: values[1] }));
  };

  const handleSearch = (text) => {
    dispatch(changeText(text));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
      <div className="fixed inset-y-0 left-0 flex max-w-full pr-10">
        <div className="flex h-full flex-col bg-white shadow-xl overflow-y-scroll min-w-80">
          <div className="flex items-start justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close panel</span>
              <IoClose />
            </button>
          </div>

          <div className="w-full border-b border-gray-200">
            <h2 className="flex items-center py-3 w-3/4 mx-auto font-medium text-lg justify-between">
              Tags
              <button
                className="text-sm font-normal text-black hover:underline"
                onClick={handleClear}
              >
                Clear
              </button>
            </h2>
          </div>
          <div className="w-full border-b border-gray-200">
            <div className="flex items-center py-3 w-4/5 mx-auto">
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                placeholder="Search"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
          </div>

          {tags.map((tag) => (
            <div className="w-full border-b border-gray-200">
              <div
                key={tag.id}
                className="flex mx-auto items-center py-3 w-4/5"
              >
                <input
                  id={tag.id}
                  name="color[]"
                  value={tag.name}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={filterTags.includes(tag.id)}
                  onChange={() => handleTag(tag)}
                />
                <label
                  htmlFor="filter-color-0"
                  className="ml-3 text-sm text-gray-600"
                >
                  {tag.name}
                </label>
              </div>
            </div>
          ))}

          <div className="w-full border-b border-gray-200">
            <div className="flex flex-col justify-start items-center 0 py-3 w-4/5 mx-auto">
              <div>
                <label
                  htmlFor="filter-color-0"
                  className="mr-3 text-sm text-gray-600"
                >
                  Price Range
                </label>
              </div>
              <div className="flex justify-between gap-2 items-center w-full">
                <input
                  type="number"
                  min={0}
                  max={5000}
                  value={filterMinPrice}
                  onChange={(e) =>
                    dispatch(
                      changeRange({
                        minPrice: parseInt(e.target.value),
                        maxPrice: filterMaxPrice,
                      })
                    )
                  }
                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />{" "}
                <div style={{ width: "80%" }}>
                  <RangeSlider
                    min={0}
                    max={5000}
                    defaultValue={[filterMinPrice, filterMaxPrice]}
                    onChange={handlePriceRange}
                  />
                </div>
                <input
                  type="number"
                  min={0}
                  max={5000}
                  value={filterMaxPrice}
                  onChange={(e) =>
                    dispatch(
                      changeRange({
                        minPrice: filterMinPrice,
                        maxPrice: parseInt(e.target.value),
                      })
                    )
                  }
                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
