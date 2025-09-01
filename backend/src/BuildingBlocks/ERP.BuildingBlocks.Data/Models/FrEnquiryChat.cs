using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryChat
{
    public int Lid { get; set; }

    public string? SMessage { get; set; }

    public int MessageTo { get; set; }

    public int? StatusId { get; set; }

    public bool ReadStatus { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }
}
