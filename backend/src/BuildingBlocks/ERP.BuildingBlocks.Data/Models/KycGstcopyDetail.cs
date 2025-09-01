using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstcopyDetail
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public int GstdetailId { get; set; }

    public string DocPath { get; set; } = null!;

    public string DocName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
