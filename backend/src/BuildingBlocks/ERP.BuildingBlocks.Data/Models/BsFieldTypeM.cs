using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsFieldTypeM
{
    public int LId { get; set; }

    public string FieldType { get; set; } = null!;

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
