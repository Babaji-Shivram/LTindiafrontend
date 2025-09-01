using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmEnquiryDoc
{
    public int Lid { get; set; }

    public int EnquiryId { get; set; }

    public string DocPath { get; set; } = null!;

    public string FileName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
