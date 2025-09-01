using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopCustomerPreAlert
{
    public long LId { get; set; }

    public int EnqId { get; set; }

    public DateTime? ShippedOnBoardDate { get; set; }

    public DateTime? PreAlertToCustDate { get; set; }

    public string? CustomerEmail { get; set; }

    public bool? AlertEmailSent { get; set; }

    public DateTime? AlertEmailDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
