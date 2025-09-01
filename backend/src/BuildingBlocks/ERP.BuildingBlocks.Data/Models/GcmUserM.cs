using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class GcmUserM
{
    public string RegId { get; set; } = null!;

    public int UserId { get; set; }

    public int? UserType { get; set; }
}
