using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrReminder
{
    public int Lid { get; set; }

    public int EnqId { get; set; }

    public int LMode { get; set; }

    public int RemindUser { get; set; }

    public DateTime RemindDate { get; set; }

    public bool RemindStatus { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
