using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerPlantAddressShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int PlantId { get; set; }

    public int AddressType { get; set; }

    public string ContactPerson { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public string City { get; set; } = null!;

    public string? StateName { get; set; }

    public string? Pincode { get; set; }

    public string? MobileNo { get; set; }

    public bool IsDefault { get; set; }

    public string? Email { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
