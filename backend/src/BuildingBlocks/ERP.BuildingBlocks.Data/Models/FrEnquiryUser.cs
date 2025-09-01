using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryUser
{
    public long Lid { get; set; }

    public long EnqId { get; set; }

    public int UserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int LUser { get; set; }
}
