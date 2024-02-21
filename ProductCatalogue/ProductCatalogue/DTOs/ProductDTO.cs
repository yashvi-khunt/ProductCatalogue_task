using ProductCatalogue.Models;

namespace ProductCatalogue.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int Price { get; set; }

        public List<ImageDTO> Images {  get; set; }
        public List<TagDTO> Tags { get; set; }  

    }
}
