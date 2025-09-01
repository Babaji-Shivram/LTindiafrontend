using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmCompanyM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? ContactPerson { get; set; }

    public string? Email { get; set; }

    public string? MobileNo { get; set; }

    public string? ContactNo { get; set; }

    public string? OfficeLocation { get; set; }

    /// <summary>
    /// 1 =&gt; Prospect, 2 =&gt; Customer
    /// </summary>
    public int LType { get; set; }

    public string? Address { get; set; }

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? AddressLine3 { get; set; }

    public string? Website { get; set; }

    public string? Description { get; set; }

    public string? DocFolder { get; set; }

    /// <summary>
    /// 0 =&gt; Inactive, 1 =&gt; Active
    /// </summary>
    public bool? StatusId { get; set; }

    /// <summary>
    /// Denotes whther this customer has entry in babaji master table BS_CustomerMS or not.
    /// </summary>
    public bool IsMaster { get; set; }

    /// <summary>
    /// Displays the id for customer if entry exists in babaji table BS_CustomerMS
    /// </summary>
    public int? CustomerId { get; set; }

    public bool? IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
