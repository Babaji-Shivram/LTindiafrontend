using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnAccountDetail
{
    public int LId { get; set; }

    public int? VendorId { get; set; }

    public string? VendorAddress { get; set; }

    public string? AccountNo { get; set; }

    public string? AccountType { get; set; }

    public string? BankName { get; set; }

    public string? BankBranchName { get; set; }

    public string? BranchCode { get; set; }

    public string? BankAddress { get; set; }

    public string? BankNineDigitCode { get; set; }

    public string? Ifsc { get; set; }

    public string? Micr { get; set; }

    public string? IsRtgsenabled { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UdpUser { get; set; }

    public bool BDel { get; set; }
}
