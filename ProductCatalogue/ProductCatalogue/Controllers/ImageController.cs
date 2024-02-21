using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;

namespace ProductCatalogue.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [HttpPost]
        public IActionResult GetImages([FromForm] ImageCreationDTO images)
        {
            //foreach (var image in images)
            //{
            //    if (image.ImageFile.Length > 0)
            //    {
            //        var imagePath = Path.GetFullPath(Path.Combine("wwwroot", "images", Guid.NewGuid().ToString() + Path.GetExtension(image.ImageFile.FileName)));


            //        using (var stream = new FileStream(imagePath, FileMode.Create))
            //        {
            //            image.ImageFile.CopyTo(stream);
            //        }

            //        //Add image to the db
            //        //_context.Images.Add(new Image
            //        //{
            //        //    ImagePath = imagePath,
            //        //    IsPrimary = image.IsPrimary,
            //        //    ProductId = product.Id
            //        //});
            //    }
            //}
            ////_context.SaveChanges();
            return Ok();
        }
    }
}
