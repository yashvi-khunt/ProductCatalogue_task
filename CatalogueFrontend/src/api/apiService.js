import config from "../config";

const apiService = {
  fetchProducts: async (ids, range, text) => {
    const query = `${config.baseUrl}/products?${
      ids.length > 0 ? `ids=${ids.join("&ids=")}&` : ""
    }range=${range}${text !== "" && text ? `&text=${text}` : ""}`;

    console.log(query);
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
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
      return [];
    }
  },

  login: async ({ username, password }) => {
    console.log(username, password);
    try {
      return await fetch(`${config.baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify({
          id: "string",
          userName: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => console.error("error", err));
    } catch (ex) {
      console.log(ex);
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
    } catch (error) {
      console.error("Error generating PDF:", error);
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
      return [];
    }
  },
};

export default apiService;
