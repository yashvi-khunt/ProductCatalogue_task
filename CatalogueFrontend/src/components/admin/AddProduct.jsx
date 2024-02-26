import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AddImage from "./AddImage";
import apiService from "../../api/apiService";
import adminApi from "../../api/adminApi";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [selectedValues, setSelectedValues] = useState([]);

  const [productImages, setProductImages] = useState({
    primaryImages: [],
    secondaryImages: [],
  });

  const [productNameError, setProductNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [primaryImageError, setPrimaryImageError] = useState("");
  const [secondaryImageError, setSecondaryImageError] = useState("");

  const handleAddTag = async (inputValue) => {
    try {
      // Make your API call here to create a new tag
      const newTag = await adminApi.addTag({ tagName: inputValue });
      // Update tags state with the newly created tag
      setTags([...tags, newTag]);
      // Return the newly created option to be selected
      return { label: newTag.name, value: newTag.id };
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const { data } = await apiService.getProductById(id);
          const product = data;
          console.log("testing", product);
          setValue("productName", product.name);
          setValue("description", product.description);
          const productTags = product.tags.map((tag) => ({
            value: tag.id,
            label: tag.name || "",
          }));
          setSelectedValues(productTags);
          setValue("tags", productTags);

          setValue("price", product.price);
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
  }, [id]);

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await apiService.fetchTags();
      console.log(tags);
      setTags(tags);
    };
    fetchTags();
  }, []);

  const handleTagsChange = (selectedTags) => {
    console.log(selectedValues);

    setSelectedValues(selectedTags);
    setValue("tags", selectedTags);
  };
  console.log(selectedValues);
  const postForm = async (data) => {
    if (id) {
      try {
        const result = await adminApi.updateProduct(id, data);
        if (result) {
          Swal.fire(
            "Success!",
            "Product updated successfully.",
            "success"
          ).then(() => {
            navigate("/admin/product");
          });
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", `Error updating product: ${error}`, "error");
      }
    } else {
      try {
        const result = await adminApi.addProduct(data);
        if (result) {
          Swal.fire("Success!", "Product added successfully.", "success").then(
            () => {
              navigate("/admin/product");
            }
          );
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", `Error adding product: ${error}`, "error");
      }
    }
  };

  const handleClear = () => {
    reset();
    navigate("/admin/product");
  };

  // const onSubmit = (data) => {
  //   const productData = {
  //     Name: data.productName,
  //     Description: data.description,
  //     Tags: data.tags.map((tag) => tag.value),
  //     Images: [
  //       { ImageFile: data.primaryImages[0].image, IsPrimary: true },
  //       ...data.secondaryImages.map((image) => ({
  //         ImageFile: image.image,
  //         IsPrimary: false,
  //       })),
  //     ],
  //     Price: data.price,
  //   };

  //   postForm(productData);
  // };
  const onSubmit = (data) => {
    let hasError = false;

    // Validate Product Name
    if (!data.productName) {
      setProductNameError("Product name is required");
      hasError = true;
    } else {
      setProductNameError("");
    }

    // Validate Price
    if (!data.price) {
      setPriceError("Price is required");
      hasError = true;
    } else if (data.price <= 0 || data.price > 5000) {
      setPriceError("Price must be a positive number less than 5000");
      hasError = true;
    } else {
      setPriceError("");
    }

    // Validate Description
    if (!data.description) {
      setDescriptionError("Description is required");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    // Validate Tags
    if (!data.tags || data.tags.length === 0) {
      setTagsError("Please select at least one tag");
      hasError = true;
    } else {
      setTagsError("");
    }

    // Validate Primary Image
    if (!data.primaryImages || data.primaryImages.length === 0) {
      setPrimaryImageError("Please upload a primary image");
      hasError = true;
    } else {
      setPrimaryImageError("");
    }

    // Validate Secondary Images
    if (!data.secondaryImages || data.secondaryImages.length === 0) {
      setSecondaryImageError("Please upload at least one secondary image");
      hasError = true;
    } else {
      setSecondaryImageError("");
    }

    if (!hasError) {
      const productData = {
        Name: data.productName,
        Description: data.description,
        Tags: data.tags.map((tag) => tag.value),
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
    }
  };

  return (
    <div className="lg:px-52 px-5 py-10">
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
              <div className="col-span-full lg:col-span-3">
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
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
                    {...register("productName", {
                      required: true,
                      pattern: /^[a-zA-Z0-9_ ]*$/,
                    })}
                  />
                  {productNameError && (
                    <span className="text-red-500 text-sm">
                      {productNameError}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full lg:col-span-3">
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                    {...register("price", {
                      required: true,
                      min: 0,
                      max: 5000,
                    })}
                  />
                  {priceError && (
                    <span className="col-span-full text-red-500 text-sm">
                      {priceError}
                    </span>
                  )}
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    defaultValue=""
                    {...register("description", { required: true })}
                  />
                  {descriptionError && (
                    <span className="col-span-full text-red-500 text-sm">
                      {descriptionError}
                    </span>
                  )}
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
                    <Controller
                      name="tags"
                      control={control}
                      defaultValue={selectedValues}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          options={tags.map((tag) => ({
                            value: tag.id,
                            label: tag.name,
                          }))}
                          isMulti
                          classNamePrefix="react-select"
                          placeholder="Select tags..."
                          onChange={handleTagsChange}
                          onCreateOption={handleAddTag}
                          isClearable={true}
                          isCreatable={true}
                        />
                      )}
                    />
                    {tagsError && (
                      <span className="col-span-full text-red-500 text-sm">
                        {tagsError}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <AddImage
                isPrimary
                control={control}
                defaultImages={productImages.primaryImages}
                setValue={setValue}
                productImages={productImages}
              />
              {primaryImageError && (
                <span className="col-span-full text-red-500 text-sm">
                  {primaryImageError}
                </span>
              )}
              <AddImage
                control={control}
                defaultImages={productImages.secondaryImages}
                setValue={setValue}
                productImages={productImages}
              />
              {secondaryImageError && (
                <span className="col-span-full text-red-500 text-sm w-full">
                  {secondaryImageError}
                </span>
              )}
            </div>
          </div>
        </div>

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
