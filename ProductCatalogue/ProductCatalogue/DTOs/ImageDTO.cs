namespace ProductCatalogue.DTOs
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string ImagePath { get; set; } = null!;

        public bool IsPrimary { get; set; }
    }
}