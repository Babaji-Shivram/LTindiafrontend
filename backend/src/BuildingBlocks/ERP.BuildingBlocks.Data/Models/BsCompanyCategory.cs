using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCompanyCategory
{
    public int Lid { get; set; }

    public int CompanyId { get; set; }

    public int CategoryId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
