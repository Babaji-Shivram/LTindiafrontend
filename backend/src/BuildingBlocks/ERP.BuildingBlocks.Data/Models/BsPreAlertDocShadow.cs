using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPreAlertDocShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public int? ConsigneeId { get; set; }

    public int? ConsigneeIdOld { get; set; }

    public string? ConsigneeCode { get; set; }

    public int? TransMode { get; set; }

    public int? Port { get; set; }

    public string? PortCode { get; set; }

    public string? PortOfLoadingCode { get; set; }

    public string? CountryOfOrigin { get; set; }

    public string? CountryOfConsignment { get; set; }

    public DateTime? Etadate { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BabajiBranchId { get; set; }

    public int? PortOfLoadingId { get; set; }

    public int? PortOfReportingId { get; set; }

    public string? CustRefNo { get; set; }

    public string? CustInstruction { get; set; }

    public bool? IsLandMode { get; set; }

    public string? Remark { get; set; }

    public int? JobId { get; set; }

    public int? Kamid { get; set; }

    public string? JobRefNo { get; set; }

    public int? LUser { get; set; }

    public int? LUserType { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public int? ShipperId { get; set; }

    public int? ConsignmentCountryId { get; set; }

    public int? DestinationCountryId { get; set; }

    public string? ConsigneeName { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
