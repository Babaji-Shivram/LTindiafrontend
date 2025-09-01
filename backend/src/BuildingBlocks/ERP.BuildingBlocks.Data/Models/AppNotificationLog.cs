using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AppNotificationLog
{
    public int Lid { get; set; }

    public int? UserId { get; set; }

    public int? NotificationTypeId { get; set; }

    public string? MessageId { get; set; }

    public int? BeSuccess { get; set; }

    public string? Message { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
