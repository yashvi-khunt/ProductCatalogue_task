using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalogue.Controllers;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;

namespace ProductCatalogue.Services
{

    public class ProductService : IProduct
    {
        private readonly ProductCatalogueContext _context;
        private readonly IMapper mapper;
        private readonly ILogger<ProductService> logger;
        public ProductService(ProductCatalogueContext context, IMapper mapper, ILogger<ProductService> logger)
        {
            this._context = context;
            this.mapper = mapper;
            this.logger = logger;
        }

        public List<ProductListDTO> GetAllProductsForVisitors(int[] ids, decimal minPrice, decimal maxPrice, string? text)
        {
            try
            {
                IQueryable<Product> productQuery = _context.Products
                    .Include(p => p.Images)
                    .Include(p => p.ProductTags)
                        .ThenInclude(pt => pt.Tag);

                if (ids.Length > 0)
                {
                    productQuery = productQuery
                        .Where(p => p.ProductTags.Any(t => ids.Contains(t.TagId)));
                }

                productQuery = productQuery.Where(p => p.Price >= minPrice && p.Price <= maxPrice);

                if (!string.IsNullOrEmpty(text))
                {
                    productQuery = productQuery.Where(p => p.Name.Contains(text));
                }

                var products = productQuery.ToList();

                return ConvertProductList(products);
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred in GetAllProductsForVisitors: " + ex);
                throw;
            }
        }


        public List<AdminProductListDTO> GetAllProducts()
        {
            try
            {
                var products = _context.Products
                .Include(p => p.Images)
                .Include(p => p.ProductTags)
                    .ThenInclude(pt => pt.Tag)
                .ToList();

                var productDTOs = new List<AdminProductListDTO>();

                foreach (var product in products)
                {
                    var primaryImage = product.Images.FirstOrDefault(i => i.IsPrimary == true);

                    var productDTO = mapper.Map<AdminProductListDTO>(product);
                    productDTO.PrimaryImage = primaryImage?.ImagePath;

                    productDTOs.Add(productDTO);
                }

                return productDTOs;
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred in GetAllProductsForAdmin: " + ex);
                throw;
            }
        }


        public ProductDTO GetProductById(int id)
        {
            try
            {
                var product = _context.Products.Include(p => p.ProductTags).ThenInclude(pt => pt.Tag).Include(p => p.Images).FirstOrDefault(p => p.Id == id);

                if (product == null) { return null; }

                var productDTO = mapper.Map<ProductDTO>(product);
                productDTO.Images = product.Images.Select(image => mapper.Map<ImageDTO>(image)).ToList();
                productDTO.Tags = product.ProductTags.Select(pt => mapper.Map<TagDTO>(pt.Tag)).ToList();
                return productDTO;

            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred in GetProductById: " + ex);
                throw;
            }
        }
        public void AddProduct([FromForm] ProductCreationDTO productDTO)
        {
            try
            {
                if (productDTO == null)
                {
                    throw new ArgumentNullException(nameof(productDTO), "Product data is required.");
                }

                if (productDTO.Images.Count == 0)
                {
                    throw new ArgumentNullException(nameof(productDTO), "Product images are required.");
                }

                // Check for duplicate product name
                if (_context.Products.Any(p => p.Name == productDTO.Name))
                {
                    throw new ArgumentException("Product with the same name already exists.");
                }

                var product = new Product
                {
                    Name = productDTO.Name,
                    Description = productDTO.Description,
                    Price = productDTO.Price,
                };

                // Add product to database
                try
                {
                    _context.Products.Add(product);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    logger.LogError("Error occurred while creating Product. + ", ex);
                }

                // Add tags and images as before
                foreach (var tag in productDTO.Tags)
                {
                    var productTag = new Tags
                    {
                        ProductId = product.Id,
                        TagId = tag
                    };

                    _context.ProductTags.Add(productTag);

                }

                foreach (var image in productDTO.Images)
                {
                    var imageDTO = new Models.Image
                    {
                        ProductId = product.Id,
                        ImagePath = image.ImageFile,
                        IsPrimary = image.IsPrimary,
                    };
                    _context.Images.Add(imageDTO);
                }
                _context.SaveChanges();

                logger.LogInformation("Product added successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while adding product.");
                throw; // or handle the exception as required
            }
        }




        public void UpdateProduct(int id, ProductCreationDTO productDTO)
        {
            try
            {
                var product = _context.Products.Include(p => p.ProductTags).Include(p => p.Images).FirstOrDefault(p => p.Id == id);
                if (product == null)
                {
                    throw new ArgumentException("Product not found.");
                }

                // Check for duplicate product name if name is being changed
                if (product.Name != productDTO.Name && _context.Products.Any(p => p.Name == productDTO.Name))
                {
                    throw new ArgumentException("Another product with the same name already exists.");
                }

                // Remove old product tag mappings
                _context.ProductTags.RemoveRange(product.ProductTags);

                // Remove old images
                _context.Images.RemoveRange(product.Images);

                // Update product properties
                product.Name = productDTO.Name;
                product.Description = productDTO.Description;
                product.Price = productDTO.Price;

                // Add new product tag mappings
                foreach (var tagId in productDTO.Tags)
                {
                    var productTag = new Tags
                    {
                        ProductId = product.Id,
                        TagId = tagId
                    };
                    _context.ProductTags.Add(productTag);
                }

                // Add new images
                foreach (var image in productDTO.Images)
                {
                    var imageDTO = new Models.Image
                    {
                        ProductId = product.Id,
                        ImagePath = image.ImageFile,
                        IsPrimary = image.IsPrimary,
                    };
                    _context.Images.Add(imageDTO);
                }

                _context.SaveChanges();
                logger.LogInformation("Product updated successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while updating product.");
                throw;
            }
        }



        public int DeleteProduct(int id)
        {
            try
            {
                var products = _context.Products.FirstOrDefault(p => p.Id == id);
                if (products == null)
                {
                    return -1;
                }
                _context.Remove(products);
                _context.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while adding product.");
                throw;
            }
        }

        public List<ProductListDTO> WishListProducts(int[] ids)
        { 
            try
            {
                var products = _context.Products
                    .Include(p => p.Images)
                    .Include(p => p.ProductTags)
                        .ThenInclude(pt => pt.Tag)
                    .Where(p => ids.Contains(p.Id))
                    .ToList();

                return ConvertProductList(products);
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred in WishListProducts : " + ex);
                throw;
            }
        }

        public List<ProductListDTO> ConvertProductList(List<Product> products)
        {
            var productDTOs = new List<ProductListDTO>();

            foreach (var product in products)
            {
                var primaryImage = product.Images.FirstOrDefault(i => i.IsPrimary == true);
                var secondaryImage = product.Images.FirstOrDefault(i => i.IsPrimary == false);

                var tags = product.ProductTags.Select(pt => new TagDTO { Id = pt.Tag.Id, Name = pt.Tag.Name }).ToList();

                var productDTO = mapper.Map<ProductListDTO>(product);
                productDTO.PrimaryImage = primaryImage?.ImagePath;
                productDTO.SecondaryImage = secondaryImage?.ImagePath;
                productDTO.Tags = tags;

                productDTOs.Add(productDTO);
            }

            return productDTOs;
        }

    }
}
