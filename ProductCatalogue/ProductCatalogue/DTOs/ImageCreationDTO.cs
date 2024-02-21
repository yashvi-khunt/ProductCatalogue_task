using ProductCatalogue.Validations;
using static ProductCatalogue.Validations.ContentTypeValidation;

namespace ProductCatalogue.DTOs
{
    public class ImageCreationDTO
    {
        public string ImageFile { get; set; }
        public bool IsPrimary { get; set; }

    }
}
