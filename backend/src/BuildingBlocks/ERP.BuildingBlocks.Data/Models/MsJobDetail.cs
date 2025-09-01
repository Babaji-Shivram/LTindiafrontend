using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsJobDetail
{
    public int Lid { get; set; }

    public string? JobRefNo { get; set; }

    public int AlertId { get; set; }

    public int? JobType { get; set; }

    public decimal? GrossWt { get; set; }

    public int? NoOfPackages { get; set; }

    public int? PackageType { get; set; }

    public string? PackageCode { get; set; }

    public string? UnitCode { get; set; }

    public decimal? AssessableValue { get; set; }

    public int? DeliveryStatus { get; set; }

    public bool ClearedStatus { get; set; }

    public bool? BackOfficeStatus { get; set; }

    public bool? Pcdstatus { get; set; }

    public int StatusId { get; set; }

    public string? FileDirName { get; set; }

    public string? ConsigneeGstin { get; set; }

    public bool? IsFundAllowed { get; set; }

    public string? Remarks { get; set; }

    public bool? IsBilled { get; set; }

    public bool? IsTransportBilled { get; set; }

    public int? FinYearId { get; set; }

    public int? UserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
