import React, { useState, useEffect } from "react";
import apiService from "../../api/apiService";
import { Link } from "react-router-dom";

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
    if (confirm("Are you sure yot want to delete Tag?")) {
      try {
        const result = await adminApi.deleteTag(id);
        if (result) {
          alert("Tag deleted successfully");

          const updatedTags = tags.filter((tag) => tag.id == id);
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <>
      <div className="pt-5 px-6 flex justify-end">
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
                  className="odd:bg-white  even:bg-gray-50  border-b "
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
    </>
  );
}

export default Tag;
