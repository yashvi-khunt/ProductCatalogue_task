import config from "../config";

const apiService = {
  fetchProducts: async (ids, min, max, text) => {
    const query = `${config.baseUrl}/products?${
      ids.length > 0 ? `ids=${ids.join("&ids=")}&` : ""
    }min=${min}&max=${max}${text !== "" && text ? `&text=${text}` : ""}`;

    console.log(query);
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch products" };
    }
  },

  fetchWishedProducts: async (ids) => {
    const query = `${config.baseUrl}/products/wishlist${
      ids.length > 0 ? `?productIds=${ids.join("&productIds=")}` : ""
    }`;
    console.log(query);
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch wished products");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch wished products" };
    }
  },

  getProductById: async (id) => {
    const query = `${config.baseUrl}/products/${id}`;
    console.log(query);
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to fetch product" };
    }
  },

  downloadPdf: async (ids) => {
    const query = `${config.baseUrl}/products/pdf${
      ids.length > 0 ? `?productIds=${ids.join("&productIds=")}` : ""
    }`;
    console.log(query);
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Wishlist.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch (error) {
      console.error("Error generating PDF:", error);
      return { success: false, error: "Failed to download PDF" };
    }
  },

  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${config.baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify({
          id: "sring",
          userName: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // If response is not successful, throw an error
        throw new Error("Invalid username or password");
      }

      return await response.json();
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Rethrow the error so it can be caught in the login function
    }
  },

  fetchTags: async () => {
    try {
      const response = await fetch(`${config.baseUrl}/tags`);
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default apiService;
