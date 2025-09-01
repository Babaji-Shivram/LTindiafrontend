using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmEnquiryService
{
    public int Lid { get; set; }

    public int EnquiryId { get; set; }

    public int ServiceId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
