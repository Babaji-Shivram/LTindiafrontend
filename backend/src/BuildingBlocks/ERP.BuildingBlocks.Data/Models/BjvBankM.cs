using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models; 
public partial class BjvBankM
{
    public int Lid { get; set; }

    public string? SName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
