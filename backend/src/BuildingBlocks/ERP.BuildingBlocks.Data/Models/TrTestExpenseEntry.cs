using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTestExpenseEntry
{
    public int Lid { get; set; }

    public int? MaintainId { get; set; }

    public DateTime? WorkMonth { get; set; }

    public DateTime? WorkDate { get; set; }

    public string? VehicleNo { get; set; }

    public int? VehicleId { get; set; }

    public string? VehicleType { get; set; }

    public string? CompanyEntity { get; set; }

    public string? MaintainceCategory { get; set; }

    public int? CateId { get; set; }

    public string? PaidTo { get; set; }

    public string? SupportingBillPaidTo { get; set; }

    public string? BillNo { get; set; }

    public string? Description { get; set; }

    public string? Amount { get; set; }
}
