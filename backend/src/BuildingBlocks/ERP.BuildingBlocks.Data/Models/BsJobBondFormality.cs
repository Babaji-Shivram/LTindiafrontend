using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobBondFormality
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int WareHouseId { get; set; }

    public string? NocNumber { get; set; }

    public DateTime? NocDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public string? Remark { get; set; }

    public bool? BStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
