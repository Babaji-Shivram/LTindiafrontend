using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCompanyAddress
{
    public int Lid { get; set; }

    public int CompanyId { get; set; }

    public string ContactPerson { get; set; } = null!;

    public string ContactAddress { get; set; } = null!;

    public string? City { get; set; }

    public int? CountryId { get; set; }

    public string? Pincode { get; set; }

    public string? PhoneNo { get; set; }

    public string? Email { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
