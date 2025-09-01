using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserDetail
{
    public int LId { get; set; }

    public int UserId { get; set; }

    public int DeptId { get; set; }

    public int DivisionId { get; set; }

    public string? Empcode { get; set; }

    public string? MobileNo { get; set; }

    public string? Address { get; set; }

    public int? LocationId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string? FaLedgerCode { get; set; }
}
