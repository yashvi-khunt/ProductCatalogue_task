import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

function AddImage({
  isPrimary = false,
  control,
  defaultImages,
  setValue = { setValue },
  productImage,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: isPrimary ? "primaryImages" : "secondaryImages",
    keyName: "id",
  });

  // const handleRemoveImage = (index) => {
  //   remove(index);
  // };
  const [images, setImages] = useState(
    defaultImages.map((image) => image.imagePath)
  );
  const handleRemoveImage = (index) => {
    remove(index);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64Image = await imageToBase64(file);
      append({ image: base64Image });
    }
  };

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (defaultImages && defaultImages.length > 0) {
      defaultImages.forEach((image) => {
        console.log(image);
        append({ image: image.imagePath });
      });
    }
  }, [defaultImages]);

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor={isPrimary ? "primary-file-upload" : "secondary-file-upload"}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {isPrimary ? <>Primary Image</> : <>Secondary Images</>}
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={
                  isPrimary ? "primary-file-upload" : "secondary-file-upload"
                }
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>
                  {isPrimary ? (
                    <>Upload a image file</>
                  ) : (
                    <>Upload multiple image files</>
                  )}
                </span>
                <input
                  id={
                    isPrimary ? "primary-file-upload" : "secondary-file-upload"
                  }
                  name={
                    isPrimary ? "primary-file-upload" : "secondary-file-upload"
                  }
                  type="file"
                  multiple={!isPrimary}
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-5">
        {fields.map((item, index) => (
          <div key={index} className="relative">
            {isPrimary && fields.length === 1 && (
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            )}
            <img
              src={item.image}
              alt={`Image ${index + 1}`}
              className="w-min object-contain mx-2"
            />
            {!isPrimary && (
              // Display a remove button for secondary images
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AddImage;
