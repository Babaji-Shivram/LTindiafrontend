using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsPreAlertDoc
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public int? ConsigneeId { get; set; }

    public string? ConsigneeCode { get; set; }

    public int? ModuleId { get; set; }

    /// <summary>
    /// 1 - Import 2 Export
    /// </summary>
    public int? TypeId { get; set; }

    public int? TransMode { get; set; }

    public int? Port { get; set; }

    public string? PortCode { get; set; }

    public string? PortOfLoadingCode { get; set; }

    public string? CountryOfOrigin { get; set; }

    public string? CountryOfConsignment { get; set; }

    public DateTime? Etadate { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BranchId { get; set; }

    public int? PortOfLoadingId { get; set; }

    public int? PortOfReportingId { get; set; }

    public string? CustRefNo { get; set; }

    public string? CustInstruction { get; set; }

    public string? Remark { get; set; }

    public int? JobId { get; set; }

    public int? Kamid { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
