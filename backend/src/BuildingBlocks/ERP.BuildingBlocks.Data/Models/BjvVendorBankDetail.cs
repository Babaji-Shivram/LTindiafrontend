using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BjvVendorBankDetail
{
    public int Lid { get; set; }

    /// <summary>
    /// Primery Key - LID - BJV_VendorMS
    /// </summary>
    public int VendorId { get; set; }

    /// <summary>
    /// 0-Any type of Payment Accepted, Other Linked To AC_RequestTypeMS ie. Duty, DO, CFS,  Detention - 
    /// </summary>
    public int AccountType { get; set; }

    public string BankName { get; set; } = null!;

    public string AccountName { get; set; } = null!;

    public string AccountNo { get; set; } = null!;

    public string Ifsccode { get; set; } = null!;

    public string? Mmidcode { get; set; }

    public bool? IsRtgs { get; set; }

    public bool? IsNeft { get; set; }

    public bool? IsImps { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
