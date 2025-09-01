using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsWhatsNew
{
    public int Id { get; set; }

    public string Heading { get; set; } = null!;

    public string Matter { get; set; } = null!;

    public int UserId { get; set; }

    public DateTime DDate { get; set; }
}
