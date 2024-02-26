import React, { useState, useEffect } from "react";
import apiService from "../../api/apiService";
import adminApi from "../../api/adminApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMenuOutline } from "react-icons/io5";
import NavToggle from "./NavToggle";

const columns = ["Id", "Tag Name", "Action"];

function Tag() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await apiService.fetchTags();
      console.log(tags);
      setTags(tags);
    };
    fetchTags();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete Tag?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await adminApi.deleteTag(id);
          if (result) {
            Swal.fire(
              "Deleted!",
              "Tag has been deleted successfully.",
              "success"
            );
            // Update the tags list after successful deletion
            const updatedTags = tags.filter((tag) => tag.id !== id);
            setTags(updatedTags);
          }
        } catch (error) {
          console.error("Error deleting tag:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the tag.",
            "error"
          );
        }
      }
    });
  };

  const [showNavbar, setShowNavbar] = useState(false);
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
          Add Tag
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
            {tags &&
              tags.map((tag, index) => (
                <tr
                  key={tag.id}
                  className="odd:bg-white  even:bg-gray-50  border-t "
                >
                  <td scope="row" className="px-6 py-4 ">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{tag.name}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        to={`./edit/${tag.id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-blue-600  hover:underline"
                        onClick={() => handleDelete(tag.id)}
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
      {showNavbar && <NavToggle onClose={toggleNavbar} />}
    </>
  );
}

export default Tag;
