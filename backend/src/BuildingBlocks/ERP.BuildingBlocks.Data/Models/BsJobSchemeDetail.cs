using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobSchemeDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int? SchemeTypeId { get; set; }

    public string? SchemeName { get; set; }

    public string? SchemeNo { get; set; }

    public DateTime? SchemeDate { get; set; }

    public decimal? LicenseAmount { get; set; }

    public decimal? LicenseDebitCifvalue { get; set; }

    public string? PortName { get; set; }

    /// <summary>
    /// 1 for License, 2 For Scheme, 3 for certificate
    /// </summary>
    public int? LType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
