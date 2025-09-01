using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExShipmentGetInDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateOnly ShippingLineDate { get; set; }

    public string? ExporterCopyPath { get; set; }

    public string? VgmcopyPath { get; set; }

    public DateOnly FreightForwardedDate { get; set; }

    public string ForwarderPersonName { get; set; } = null!;

    public string? ForwardToEmail { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
