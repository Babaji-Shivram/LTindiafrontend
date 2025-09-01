using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmLeadService
{
    public int Lid { get; set; }

    public int LeadId { get; set; }

    public int? EnquiryId { get; set; }

    public int ServiceId { get; set; }

    public int? ServiceLocationId { get; set; }

    public string? VolumeExpected { get; set; }

    public DateTime? ExpectedCloseDate { get; set; }

    public string? Requirement { get; set; }

    public int? SubProductId { get; set; }

    public int? CountryId { get; set; }

    public int? PortId { get; set; }

    public int? TradeLaneId { get; set; }

    public int? Uomid { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
