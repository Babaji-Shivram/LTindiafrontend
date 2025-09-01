using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerPlantAddress
{
    public int LId { get; set; }

    public int PlantId { get; set; }

    /// <summary>
    /// Use 1 for Billing Address and 2 for PCA Address
    /// </summary>
    public int AddressType { get; set; }

    public string ContactPerson { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public string City { get; set; } = null!;

    public string? StateName { get; set; }

    public string? Pincode { get; set; }

    public string? MobileNo { get; set; }

    /// <summary>
    /// Value will be True if address is used for printing. only one address can be default address
    /// </summary>
    public bool IsDefault { get; set; }

    public string? Email { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
