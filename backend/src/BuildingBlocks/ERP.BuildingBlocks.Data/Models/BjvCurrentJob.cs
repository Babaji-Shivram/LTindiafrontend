using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvCurrentJob
{
    public long Lid { get; set; }

    public long? JobId { get; set; }

    public int? CustomerId { get; set; }

    public int? BranchId { get; set; }

    public int? ModuleId { get; set; }

    public string? Ref { get; set; }

    public string? ParCode { get; set; }

    public string? Vessal { get; set; }

    public string? Yref { get; set; }

    public DateTime? Odate { get; set; }

    public DateTime? Fsb { get; set; }

    public DateTime? Clrdate { get; set; }

    public string? Remarks { get; set; }

    public decimal? Amount { get; set; }

    public string? ParName { get; set; }

    public string? LocnCode { get; set; }

    public string? DivCode { get; set; }

    public string? Ccm { get; set; }

    public string? Kam { get; set; }

    public string? Hod { get; set; }

    public bool IsActive { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
