using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsNotificationUser
{
    public int Lid { get; set; }

    public int CustUserId { get; set; }

    public int? LocationId { get; set; }

    public int NotificationTypeId { get; set; }

    public int NotificationModeId { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
