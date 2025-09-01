using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezJobDetail
{
    public int Lid { get; set; }

    public string JobRefNo { get; set; } = null!;

    public int? Seztype { get; set; }

    public int? RequestType { get; set; }

    public int? Sezmode { get; set; }

    public string? Person { get; set; }

    public int? ClientName { get; set; }

    public int? Division { get; set; }

    public int? Plant { get; set; }

    public string? SupplierName { get; set; }

    public int? Currency { get; set; }

    public decimal? ExRate { get; set; }

    public decimal? AssesableValue { get; set; }

    public string? InwardBeno { get; set; }

    public string? InwardJobNo { get; set; }

    public DateOnly? InwardBedate { get; set; }

    public int? DaysStore { get; set; }

    public string? Beno { get; set; }

    public DateOnly? Bedate { get; set; }

    public string? RequestId { get; set; }

    public decimal? DutyAmount { get; set; }

    public DateOnly? InwardDate { get; set; }

    public int? NoOfPackages { get; set; }

    public decimal? GrossWeight { get; set; }

    public int? NoOfVehicles { get; set; }

    public int? ServicesProvide { get; set; }

    public DateOnly? OutwardDate { get; set; }

    public DateOnly? PcdfrDahej { get; set; }

    public DateOnly? PcdsentClient { get; set; }

    public DateOnly? FileSentToBilling { get; set; }

    public string? BillingStatus { get; set; }

    public string? Remark { get; set; }

    public string? Rnlogistics { get; set; }

    public int? DutyPf { get; set; }

    public int? PackageUnit { get; set; }

    public decimal? Cifvalue { get; set; }

    public string? Chacode { get; set; }

    public string? BuyerName { get; set; }

    public int? GrossWtUnit { get; set; }

    public int? Destination { get; set; }

    public int? Country { get; set; }

    public int? Place { get; set; }

    public string? FileDirName { get; set; }

    public int? JobStatus { get; set; }

    public string? JobStatusRemark { get; set; }

    public int FinYear { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public int LUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
