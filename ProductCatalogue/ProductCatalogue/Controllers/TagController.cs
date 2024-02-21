using Microsoft.AspNetCore.Mvc;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;

namespace ProductCatalogue.Controllers
{
    [Route("api/tags")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITag tagRepository;
        private readonly ILogger<TagController> _logger;
        private readonly ProductCatalogueContext _context;


        public TagController(ITag tagRepository, ILogger<TagController> logger,ProductCatalogueContext context)
        {
            this.tagRepository = tagRepository;
            this._logger = logger;
            this._context = context;
        }

        [HttpGet]
        public ActionResult<List<TagDTO>> GetAllTags()
        {
            var tags  = tagRepository.GetAllTags();
            if(tags == null || tags.Count == 0)
            {
                return NotFound("No products found.");
            }
            return tags;
        }

        [HttpGet("{id}")]
        public ActionResult<TagDTO> GetTagById(int id)
        {
            var tag = _context.Tags.Find(id);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }
            var tagDTO = new TagDTO { Id = tag.Id, Name = tag.Name };
            return tagDTO;
        }

        [HttpPost]
        public ActionResult<TagDTO> AddTag(TagDTO tagDTO)
        {
            var tag = new Tag { Name = tagDTO.Name };
            _context.Tags.Add(tag);
            _context.SaveChanges();
            tagDTO.Id = tag.Id;
            return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tagDTO);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTag(int id, TagDTO tagDTO)
        {
            var tag = _context.Tags.Find(id);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            tag.Name = tagDTO.Name;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTag(int id)
        {
            var tag = _context.Tags.Find(id);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            _context.Tags.Remove(tag);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
