using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycCompanyCategory
{
    public int Lid { get; set; }

    public int? CompanyId { get; set; }

    public int? CatagoryId { get; set; }

    public int? Iuser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
