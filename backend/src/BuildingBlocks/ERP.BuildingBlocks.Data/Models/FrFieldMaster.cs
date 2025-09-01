using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrFieldMaster
{
    public int FieldId { get; set; }

    public string? FieldName { get; set; }

    public int? FieldGroup { get; set; }

    public int? FieldDataType { get; set; }

    /// <summary>
    /// 1 For Standard Field, 2 For Additional Field
    /// </summary>
    public int? LType { get; set; }

    public bool? IsBabajiReport { get; set; }

    public bool? IsCustomerReport { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
