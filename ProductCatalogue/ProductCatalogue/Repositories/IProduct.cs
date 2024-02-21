using ProductCatalogue.DTOs;
using ProductCatalogue.Models;

namespace ProductCatalogue.Repositories
{
    public interface IProduct
    {
        List<ProductListDTO> GetAllProductsForVisitors(int[] tagIds,int range,string? text);
        List<ProductListDTO> WishListProducts(int[] ids);
        List<AdminProductListDTO> GetAllProducts();
       
        ProductDTO GetProductById(int id);
        void AddProduct(ProductCreationDTO product);

        void UpdateProduct(int id,ProductCreationDTO productDTO);

        int DeleteProduct(int id);

    }
}
