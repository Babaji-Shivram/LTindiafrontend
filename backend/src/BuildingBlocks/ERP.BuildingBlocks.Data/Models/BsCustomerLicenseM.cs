using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerLicenseM
{
    public int Lid { get; set; }

    public int CustomerId { get; set; }

    public string? Iec { get; set; }

    public int LicenseTypeId { get; set; }

    public string LicenceNo { get; set; } = null!;

    public string? PortCode { get; set; }

    public int? PortId { get; set; }

    public DateTime? LicenseIssueDate { get; set; }

    public DateTime? LicenseValidityDate { get; set; }

    public decimal? LicenseValue { get; set; }

    public decimal? OpenBalance { get; set; }

    public decimal? CloseBalance { get; set; }

    public DateTime? OpenDate { get; set; }

    public DateTime? CloseDate { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
