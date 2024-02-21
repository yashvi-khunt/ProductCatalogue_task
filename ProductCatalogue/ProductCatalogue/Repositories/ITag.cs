using ProductCatalogue.DTOs;

namespace ProductCatalogue.Repositories
{
    public interface ITag
    {
        List<TagDTO> GetAllTags();
        TagDTO GetTagById(int id);
        TagDTO AddTag(TagDTO tagDTO);
        TagDTO UpdateTag(TagDTO tagDTO);
    }
}
