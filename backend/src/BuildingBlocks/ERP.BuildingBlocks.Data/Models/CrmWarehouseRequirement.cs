using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmWarehouseRequirement
{
    public int Lid { get; set; }

    public int OpportunityId { get; set; }

    public int LeadServiceId { get; set; }

    /// <summary>
    /// 0 - Closed, 1 - Open
    /// </summary>
    public bool TypeId { get; set; }

    /// <summary>
    /// 0  - Bonded, 1 - General
    /// </summary>
    public bool ActivityTypeId { get; set; }

    public int? StructureTypeId { get; set; }

    public string? SpaceRequirement1 { get; set; }

    /// <summary>
    /// 1 - sq.ft, 2 - sq.mt
    /// </summary>
    public int? RequirementUnit1 { get; set; }

    public string? SpaceRequirement2 { get; set; }

    public string? Specification { get; set; }

    public string? Location { get; set; }

    public string? Tenure { get; set; }

    public string? Commodity { get; set; }

    /// <summary>
    /// 0 - Dedicated, 1 - Value Added
    /// </summary>
    public bool? StorageTypeId { get; set; }

    public string? ValueAddedServices { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
