using System;
using System.Collections.Generic;

namespace ProductCatalogue.Models;

public partial class Tag
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Tags> ProductTags { get; set; } = new List<Tags>();
}
