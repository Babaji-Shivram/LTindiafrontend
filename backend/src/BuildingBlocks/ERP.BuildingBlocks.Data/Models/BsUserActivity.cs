using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserActivity
{
    public int LId { get; set; }

    public int UserId { get; set; }

    public string OnetimePassword { get; set; } = null!;

    public DateTime ValidFromDate { get; set; }

    public DateTime ValidTillDate { get; set; }

    public bool? IsMailSent { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
