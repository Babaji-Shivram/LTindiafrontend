using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmTaskNotification
{
    public int Lid { get; set; }

    public int TaskId { get; set; }

    /// <summary>
    /// 1=&gt; Email, 2=&gt;SMS, 3=&gt; Popup
    /// </summary>
    public int NotificationId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
