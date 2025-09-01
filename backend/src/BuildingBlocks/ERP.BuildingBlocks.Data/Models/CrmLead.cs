using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmLead
{
    public int Lid { get; set; }

    public string? LeadRefNo { get; set; }

    public int? CompanyId { get; set; }

    public string? CompanyName { get; set; }

    public int? LeadStageId { get; set; }

    public int? LeadSourceId { get; set; }

    public string? LeadSourceValue { get; set; }

    public int? SectorId { get; set; }

    public int? CompanyTypeId { get; set; }

    public string? Turnover { get; set; }

    public string? EmployeeCount { get; set; }

    public int? BusinessCategoryId { get; set; }

    public string? ContactName { get; set; }

    public string? Designation { get; set; }

    public int RoleId { get; set; }

    public string? Email { get; set; }

    public string? MobileNo { get; set; }

    public string? AlternatePhone { get; set; }

    public string? Address { get; set; }

    public string? Description { get; set; }

    public bool RfqReceived { get; set; }

    public int? FinYear { get; set; }

    public DateOnly? LeadDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
