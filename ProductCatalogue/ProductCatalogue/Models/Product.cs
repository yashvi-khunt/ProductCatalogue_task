using System;
using System.Collections.Generic;

namespace ProductCatalogue.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Price { get; set; }

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<Tags> ProductTags { get; set; } = new List<Tags>();
}
