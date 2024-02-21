import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AddImage from "./AddImage";
import apiService from "../../api/apiService";
import adminApi from "../../api/adminApi";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [productImages, setProductImages] = useState({
    primaryImages: [],
    secondaryImages: [],
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const product = await apiService.getProductById(id);
          console.log(product);
          setValue("productName", product.name);
          setValue("description", product.description);

          if (tags && tags.length > 0) {
            setValue(
              "tags",
              product.tags.map((tag) => tag.id)
            );
          }
          setValue("price", product.price); // Set the price value
          // Set product images
          if (product.images && product.images.length > 0) {
            const primaryImages = product.images.filter((img) => img.isPrimary);
            const secondaryImages = product.images.filter(
              (img) => !img.isPrimary
            );
            setProductImages({
              primaryImages: primaryImages,
              secondaryImages: secondaryImages,
            });
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchProductDetails();
  }, [id, setValue]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await apiService.fetchTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  const handleTagsChange = (selectedTags) => {
    const selectedTagIds = selectedTags.map((tag) => tag.value);

    setValue("tags", selectedTagIds);
  };

  const postForm = async (data) => {
    if (id) {
      try {
        const result = await adminApi.updateProduct(id, data);
        if (result) {
          alert("Product updated successfully");
          navigate("/admin/product");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Error updating product:", error);
      }
    } else {
      console.log(data);
      try {
        const result = await adminApi.addProduct(data);
        if (result) {
          alert("Product added successfully");
          navigate("/admin/product");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Error adding product:", error);
      }
    }
  };

  const handleClear = () => {
    reset();
    navigate("/admin/product");
  };

  const onSubmit = (data) => {
    const productData = {
      Name: data.productName,
      Description: data.description,
      Tags: data.tags,
      Images: [
        { ImageFile: data.primaryImages[0].image, IsPrimary: true },
        ...data.secondaryImages.map((image) => ({
          ImageFile: image.image,
          IsPrimary: false,
        })),
      ],
      Price: data.price,
    };

    postForm(productData);
  };

  return (
    <div className="px-52 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Product Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please fill all the product details
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    autoComplete="productName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    {...register("productName")}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
                    {...register("description")}
                  />
                </div>
              </div>

              {tags.length > 0 && (
                <div className="col-span-full">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tags
                  </label>
                  <div className="mt-2">
                    <Select
                      id="tags"
                      name="tags"
                      options={tags.map((tag) => ({
                        value: tag.id,
                        label: tag.name || "",
                      }))}
                      isMulti
                      classNamePrefix="react-select"
                      placeholder="Select tags..."
                      onChange={handleTagsChange} //
                    />
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("price")}
                  />
                </div>
              </div>

              <AddImage
                isPrimary
                control={control}
                defaultImages={productImages.primaryImages}
                setValue={setValue}
                productImages={productImages}
              />
              <AddImage
                control={control}
                defaultImages={productImages.secondaryImages}
                setValue={setValue}
                productImages={productImages}
              />
            </div>
          </div>
        </div>

        {/* Add other images */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
