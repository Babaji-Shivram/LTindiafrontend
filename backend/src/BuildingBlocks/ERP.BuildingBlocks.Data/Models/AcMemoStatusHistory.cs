using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcMemoStatusHistory
{
    public int Lid { get; set; }

    public int MemoId { get; set; }

    public int LStatus { get; set; }

    public string SRemark { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsFinal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
