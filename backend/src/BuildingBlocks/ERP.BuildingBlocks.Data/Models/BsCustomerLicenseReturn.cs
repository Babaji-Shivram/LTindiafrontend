using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerLicenseReturn
{
    public int Lid { get; set; }

    public int LicenseId { get; set; }

    public DateTime ReceiveDate { get; set; }

    public decimal ReceiveValue { get; set; }

    public DateTime? ReturnDate { get; set; }

    public string? DispatchAddress { get; set; }

    public int? DispatchMode { get; set; }

    public string? DispatchName { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
