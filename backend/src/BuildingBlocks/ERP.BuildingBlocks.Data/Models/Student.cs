using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class Student
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int? Mobile { get; set; }

    public int? Age { get; set; }

    public string? Stream { get; set; }
}
