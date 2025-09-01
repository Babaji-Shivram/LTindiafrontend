using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmVisitCategory
{
    public int LId { get; set; }

    public string CategoryName { get; set; } = null!;
}
