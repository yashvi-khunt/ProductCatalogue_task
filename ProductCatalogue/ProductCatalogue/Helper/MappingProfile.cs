using AutoMapper;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;

namespace ProductCatalogue.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<Product, ProductListDTO>().ReverseMap();
            CreateMap<Models.Image, ImageDTO>().ReverseMap();
            CreateMap<Tags, TagDTO>().ReverseMap();
            CreateMap<Product, AdminProductListDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ProductTags.Select(pt => pt.Tag)));
            

            CreateMap<ProductCreationDTO, Product>().ReverseMap();
            CreateMap<Tag, TagDTO>().ReverseMap();  
        }
    }
}
