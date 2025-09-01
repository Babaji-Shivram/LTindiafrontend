using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmMomAttendee
{
    public int Lid { get; set; }

    public int? MomId { get; set; }

    public int? UserId { get; set; }

    public string? UserName { get; set; }

    public string? UserEmail { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
