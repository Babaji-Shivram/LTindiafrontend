using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnAccountDetailsM
{
    public int LId { get; set; }

    public int? VendorKycId { get; set; }

    public string? BankName { get; set; }

    public string? AccountNo { get; set; }

    public string? Ifsccode { get; set; }

    public string? Micrcode { get; set; }

    public string? AccountType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UdpUser { get; set; }

    public bool BDel { get; set; }
}
