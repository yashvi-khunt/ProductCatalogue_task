using AutoMapper;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;

namespace ProductCatalogue.Services
{
    public class TagService : ITag
    {
        private readonly ProductCatalogueContext _context;
        private readonly IMapper mapper;
        private readonly ILogger<ProductService> logger;
        public TagService(ProductCatalogueContext context, IMapper mapper, ILogger<ProductService> logger)
        {
            this._context = context;
            this.mapper = mapper;
            this.logger = logger;
        }

        public TagDTO AddTag(TagDTO tagDTO)
        {
            throw new NotImplementedException();
        }

        public List<TagDTO> GetAllTags()
        {
            try
            {
                var tags = _context.Tags.ToList();
                var tagsDTO = mapper.Map<List<TagDTO>>(tags);
                return tagsDTO;
            }catch(Exception ex)
            {
                logger.LogError("Error occurred in GetAllProductsForAdmin: " + ex);
                throw;
            }
         }

        public TagDTO GetTagById(int id)
        {
            throw new NotImplementedException();
        }

        public TagDTO UpdateTag(TagDTO tagDTO)
        {
            throw new NotImplementedException();
        }
    }
}
