using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string SEmail { get; set; } = null!;

    /// <summary>
    /// lType -1 is for Super Admin , lType 1 is for Babaji Employee and 2 is for Customer Employee
    /// </summary>
    public int LType { get; set; }

    public int? LRoleId { get; set; }

    public string? SCode { get; set; }

    public bool? ResetCode { get; set; }

    public int? ResetDays { get; set; }

    public DateTime? CodeValidTillDate { get; set; }

    public bool? IsMailSent { get; set; }

    public DateTime? LastCodeResetDate { get; set; }

    public bool LoginActive { get; set; }

    public DateTime? LastLoginDate { get; set; }

    public string? IpAddress { get; set; }

    public bool AccessContract { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public bool? IsAvailable { get; set; }

    public string? SignImgPath { get; set; }

    public virtual ICollection<BsUserToken> BsUserTokens { get; set; } = new List<BsUserToken>();
}
