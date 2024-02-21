namespace ProductCatalogue.DTOs
{
    public class ProductListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public string Description { get; set; }
        public int Price { get; set; }
        public string PrimaryImage { get; set; }
        public string SecondaryImage { get; set; }
        public List<TagDTO> Tags { get; set; }
    }

    public class AdminProductListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string PrimaryImage { get; set; }
    }
}
