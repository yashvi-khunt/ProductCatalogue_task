import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiService from "../../api/apiService";
import adminApi from "../../api/adminApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddTag() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const [currtag, setCurrTag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      const tag = await adminApi.getTagById(id);

      setCurrTag(tag);
      console.log(tag);
      reset(tag);
    };
    fetchTag();
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (id) {
      const res = await adminApi.updateTag(id, data);
      if (res) {
        alert("Tag updated successfully");
        navigate("/admin/tag");
      } else {
        alert("Something went wrong while updating tag.");
      }
    } else {
      console.log(data);
      const res = await adminApi.addTag(data);
      if (res) {
        alert("Product added successfully");
      } else {
        alert("Something went wrong.");
      }
    }
  };
  const handleClear = () => {
    reset();
    navigate("/admin/tag");
  };

  return (
    <div>
      <div className="px-52 py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Tag Form
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill all the tag details
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="tagName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tag Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="tagName"
                      name="tagName"
                      autoComplete="tagName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("tagName")}
                      defaultValue={currtag.name}
                    />
                  </div>
                </div>
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
    </div>
  );
}

export default AddTag;
