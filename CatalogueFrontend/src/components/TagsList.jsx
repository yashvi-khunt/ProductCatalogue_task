import React, { useEffect, useState } from "react";
import { TbShoppingCartHeart } from "react-icons/tb";
import { HiFilter } from "react-icons/hi";
import apiService from "../api/apiService";
import { ListComponent } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilter,
  clearFilters,
  removeFilter,
  changeRange,
  changeText,
} from "../store/filterSlice";

function TagsList({ children }) {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const [showWishlist, setShowWishlist] = useState(false);

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const handleSearch = (text) => {
    if (!text) {
      text = "";
    }
    dispatch(changeText(text));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const filterTags = useSelector((state) => state.filter.tags);
  const filterRange = useSelector((state) => state.filter.range);

  const handleTag = (tag) => {
    if (filterTags.includes(tag.id)) {
      dispatch(removeFilter({ tagId: tag.id }));
    } else {
      dispatch(addFilter({ tagId: tag.id }));
    }
  };

  const handleRange = (range) => {
    dispatch(changeRange({ range: range }));
  };

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await apiService.fetchTags();
      console.log(tags);
      setTags(tags);
    };
    fetchTags();
  }, []);

  return (
    <>
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center">
          <div className="flex text-left">
            <button
              type="button"
              className=" p-2 text-gray-400 hover:text-gray-500 "
              onClick={toggleWishlist}
            >
              <span className="sr-only">View WishList</span>
              <TbShoppingCartHeart size={25} />
            </button>
            <button
              type="button"
              className=" p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <span className="sr-only">Tags</span>
              <HiFilter size={25} />
            </button>
          </div>
        </div>
      </div>

      <section className="py-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* tags */}
          <div className="hidden h-max lg:flex flex-col w-full items-center justify-between bg-white text-sm text-gray-400 ">
            <div className="flex items-center border-b border-gray-200 py-3 w-full">
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                placeholder="Search"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>

            <h2 className="flex items-center border-b border-gray-200 py-3 w-full font-medium text-lg justify-between">
              Tags
              <button
                className="text-sm font-normal text-black hover:underline"
                onClick={handleClear}
              >
                Clear
              </button>
            </h2>

            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center border-b border-gray-200 py-3 w-full"
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
            ))}

            <div className="flex items-center border-b border-gray-200 py-3 w-full">
              <label
                htmlFor="filter-color-0"
                className="mr-3 text-sm text-gray-600"
              >
                Price Range
              </label>
              <input
                type="range"
                min={0}
                max={5000}
                value={filterRange}
                className="cursor-pointer"
                onChange={(e) => {
                  handleRange(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="lg:col-span-3 border-dashed border-2 rounded-lg">
            {children}
          </div>
        </div>
      </section>
      {showWishlist && <ListComponent onClose={toggleWishlist} />}
    </>
  );
}

export default TagsList;
