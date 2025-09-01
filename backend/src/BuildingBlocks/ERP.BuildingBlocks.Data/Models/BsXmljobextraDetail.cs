using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsXmljobextraDetail
{
    public int? JobId { get; set; }

    public string? BrokerId { get; set; }

    public string? BrokerName { get; set; }

    public string? CustomerId { get; set; }

    public string? ImporterId { get; set; }

    public string? ConsigneeId { get; set; }

    public string? Countryoforigin { get; set; }

    public string? ManufactureName { get; set; }

    public string? WeightUom { get; set; }

    public string? Preferencecode1 { get; set; }

    public string? ExportCountry { get; set; }

    public string? RelatedPartyFlag { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
