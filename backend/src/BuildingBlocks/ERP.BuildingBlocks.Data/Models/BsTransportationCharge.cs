using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTransportationCharge
{
    public int Lid { get; set; }

    public int QuotationId { get; set; }

    public string Particulars { get; set; } = null!;

    public string ChargesApplicable { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
