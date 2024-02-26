import config from "../config";

const adminApi = {
  fetchProductList: async () => {
    const query = `${config.baseUrl}/admin/products`;
    console.log(query);
    try {
      const response = await fetch(query, {});
      if (!response.ok) {
        throw new Error("Failed to fetch product list");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch product list" };
    }
  },

  deleteProduct: async (productId) => {
    const query = `${config.baseUrl}/products/${productId}`;
    try {
      const response = await fetch(query, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to delete product" };
    }
  },

  addProduct: async (productData) => {
    const query = `${config.baseUrl}/products`;
    try {
      const response = await fetch(query, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to add product" };
    }
  },

  updateProduct: async (id, data) => {
    const query = `${config.baseUrl}/products/${id}`;
    try {
      const response = await fetch(query, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to update product" };
    }
  },
  addTag: async (tag) => {
    const query = `${config.baseUrl}/tags`;
    try {
      const response = await fetch(query, {
        method: "POST",
        body: JSON.stringify({ id: 0, name: tag.tagName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  getTagById: async (id) => {
    const query = `${config.baseUrl}/tags/${id}`;
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  updateTag: async (id, { tagName }) => {
    const query = `${config.baseUrl}/tags/${id}`;
    try {
      const response = await fetch(query, {
        method: "PUT",
        body: JSON.stringify({ id: id, name: tagName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      return true; // Or you can return response.json() if necessary
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  deleteTag: async (id) => {
    const query = `${config.baseUrl}/tags/${id}`;
    try {
      const response = await fetch(query, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete tag");
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default adminApi;
