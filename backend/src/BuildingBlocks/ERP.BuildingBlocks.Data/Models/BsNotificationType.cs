using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsNotificationType
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public bool? IsBabaji { get; set; }

    public bool? IsCustomer { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
