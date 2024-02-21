using ProductCatalogue.Validations;
using System.ComponentModel.DataAnnotations;

namespace ProductCatalogue.DTOs
{
    public class ProductCreationDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;

        [RestrictNegativeValue]
        public int Price { get; set; }

        public List<int> Tags { get; set; }
        public List<ImageCreationDTO> Images { get; set; }
    }
}
