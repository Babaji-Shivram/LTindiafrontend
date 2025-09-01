using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class GstGst
{
    public int Lid { get; set; }

    public bool? IsCompany { get; set; }

    public bool? IsGstregister { get; set; }

    public string? CompanyName { get; set; }

    public string? ComapnyPanNo { get; set; }

    public string? EmployeeForGst { get; set; }

    public string? ContactNo { get; set; }

    public string? EmailAddress { get; set; }

    public string? DirName { get; set; }

    public string? PanFilePath { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
