using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobField
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int FieldId { get; set; }

    public string FieldValue { get; set; } = null!;

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
