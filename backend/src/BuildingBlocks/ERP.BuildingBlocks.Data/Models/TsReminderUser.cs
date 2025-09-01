using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TsReminderUser
{
    public int Lid { get; set; }

    public int? ReminderId { get; set; }

    public int? UserId { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
