using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AdJobDetail
{
    public int Lid { get; set; }

    public string JobRefNo { get; set; } = null!;

    public int JobType { get; set; }

    public int? ActualJobId { get; set; }

    public decimal? DebitAmount { get; set; }

    public decimal? CreditAmount { get; set; }

    public decimal? Amount { get; set; }

    public string? Remark { get; set; }

    public bool MoveToBilling { get; set; }

    public int? MovedBy { get; set; }

    public DateTime? MovedDate { get; set; }

    public string? FileDirName { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string? ActualJobRefNo { get; set; }

    public decimal? GrossWeight { get; set; }

    public int? Kamid { get; set; }

    public int? NoOfPackages { get; set; }

    public int? Mode { get; set; }

    public int? Port { get; set; }

    public int? CustId { get; set; }

    public int? ConsigneeId { get; set; }

    public int? CustDivision { get; set; }

    public int? CustPlant { get; set; }

    public string? CustRefNo { get; set; }

    public string? Gstno { get; set; }

    public string? PurposeOfJob { get; set; }

    public bool? IsBillable { get; set; }

    public int? ModuleId { get; set; }

    public bool? IsApprove { get; set; }

    public int? ApproveBy { get; set; }

    public DateTime? ApproveDate { get; set; }

    public int? ParntModuleId { get; set; }

    public int? FinYear { get; set; }

    public int? Branchid { get; set; }
}
