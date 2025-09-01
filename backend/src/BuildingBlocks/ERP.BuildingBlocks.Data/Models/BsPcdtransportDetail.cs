using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdtransportDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? PersonName { get; set; }

    public DateTime? TransportDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
