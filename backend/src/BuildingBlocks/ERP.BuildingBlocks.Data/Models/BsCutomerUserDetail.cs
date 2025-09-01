using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCutomerUserDetail
{
    public int Lid { get; set; }

    public int CustomerUserId { get; set; }

    public int CustomerId { get; set; }

    public string? Designation { get; set; }

    public DateTime? DtBirthDate { get; set; }

    public string? MobileNo { get; set; }

    public string? FaxNo { get; set; }

    public string? OfficeNo { get; set; }

    public string? CityName { get; set; }

    public int? CountryId { get; set; }

    public bool BDel { get; set; }
}
