using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerRgbranch
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? BranchName { get; set; }

    public string? PlantName { get; set; }

    public string? Address { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }

    public string? BillingCity { get; set; }

    public string? BillingPinCode { get; set; }

    public string? BillingContactName { get; set; }

    public string? BillingMobilNo { get; set; }

    public string? BillingEmailId { get; set; }

    public string? Pcdaddress { get; set; }

    public string? Pcdcity { get; set; }

    public string? Pcdpincode { get; set; }

    public string? PcdcontactName { get; set; }

    public string? PcdmobilNo { get; set; }

    public string? Pcdemailid { get; set; }
}
