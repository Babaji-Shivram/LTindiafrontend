using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobForm13Detail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateOnly? Form13Date { get; set; }

    public DateOnly? TransHandoverDate { get; set; }

    public DateOnly? ContainerGetInDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
