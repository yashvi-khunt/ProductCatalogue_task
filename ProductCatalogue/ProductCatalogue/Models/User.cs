using System;
using System.Collections.Generic;

namespace ProductCatalogue.Models;

public partial class User
{
    public string Id { get; set; } = null!;

    public string? UserName { get; set; }

    public string? Password { get; set; }
}
