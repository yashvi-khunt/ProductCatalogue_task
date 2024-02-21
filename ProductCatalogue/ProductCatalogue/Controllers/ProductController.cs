using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogue.DTOs;
using ProductCatalogue.Helper;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;
using System;

namespace ProductCatalogue.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct productRepository;
        private readonly IConverter _converter;
        public ProductController(IProduct productRepository,IConverter converter)
        {
            this.productRepository = productRepository;
            _converter = converter;
        }


        [HttpGet]
        public ActionResult<List<ProductListDTO>> GetAllProducts([FromQuery] int[] ids, [FromQuery] int range, [FromQuery]string? text)
        {
            
            var products = this.productRepository.GetAllProductsForVisitors(ids,range,text);
            if(products == null || products.Count == 0)
            {
                return NotFound("No products found.");
            }
            return products;
        }

        [HttpGet("wishlist")]
        public ActionResult<List<ProductListDTO>> WishListProducts([FromQuery] int[] productIds)
        {
            if (productIds == null || productIds.Length == 0)
            {
                return BadRequest("No product IDs provided.");
            }
            var products = productRepository.WishListProducts(productIds);
            if (products == null || products.Count == 0)
            {
                return NotFound("No products found for the provided IDs.");
            }

            return products;
        }
        [HttpGet("{id}")]
        public ActionResult<ProductDTO> GetProduct(int id)
        {
            var product =  this.productRepository.GetProductById(id);
            if(product == null)
            {
                return NotFound("No product with given id found");
            }
            return product;
        }
        //[Authorize]
        [HttpGet("/api/admin/products")]
        public ActionResult<List<AdminProductListDTO>> GetAllProductsForAdmin()
        {
            return this.productRepository.GetAllProducts();
        }
        //[Authorize]

        [HttpPost]
        
       
        public IActionResult AddProduct([FromBody] ProductCreationDTO productDTO)
        {
            try
            {
                this.productRepository.AddProduct(productDTO);
                return Ok("Product added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error occurred while adding product: {ex.Message}");
            }
        }
        //[Authorize]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var result = this.productRepository.DeleteProduct(id);
                if(result == 1)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, $"Product not found");
                }
            }
            catch (Exception ex)
            {
               return StatusCode(StatusCodes.Status500InternalServerError, $"Error occurred while adding product: {ex.Message}");
            }
        }
        [HttpGet("pdf")]
        public IActionResult CreatePDF([FromQuery] int[] productIds)
        {
            var products = productRepository.WishListProducts(productIds);

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
                //Out = @"D:\Wishlist.pdf"
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.GetHTMLString(products),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var pdfBytes = _converter.Convert(pdf);

            // Return the PDF as a file response
            return File(pdfBytes, "application/pdf", "Wishlist.pdf");
        }
    }
}
