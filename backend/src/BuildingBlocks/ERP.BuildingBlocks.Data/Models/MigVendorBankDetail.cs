using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigVendorBankDetail
{
    public double? Sl { get; set; }

    public string? VendorName { get; set; }

    public string? VendorCode { get; set; }

    public string? State { get; set; }

    public string? Gstno { get; set; }

    public string? PanNo { get; set; }

    public double? CreditDays { get; set; }

    public string? BankName { get; set; }

    public string? AccountNo { get; set; }

    public string? Ifsccode { get; set; }
}
