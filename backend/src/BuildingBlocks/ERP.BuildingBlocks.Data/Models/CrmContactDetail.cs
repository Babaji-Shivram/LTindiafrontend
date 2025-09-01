using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmContactDetail
{
    public int Lid { get; set; }

    public string ContactName { get; set; } = null!;

    public int? CompanyId { get; set; }

    public string? Designation { get; set; }

    public int? RoleId { get; set; }

    public string? MobileNo { get; set; }

    public string? Email { get; set; }

    public string? AlternatePhone { get; set; }

    public string? Address { get; set; }

    public string? Description { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
