using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillReturnDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int Bjvlid { get; set; }

    public decimal? Amount { get; set; }

    public string? Reason { get; set; }

    public string? RemarkCust { get; set; }

    public DateOnly? ChangesDate { get; set; }

    public DateOnly? NewDispatchDate { get; set; }

    public string? RemarkBsend { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? BDel { get; set; }
}
