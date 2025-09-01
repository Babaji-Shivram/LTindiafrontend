using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TwTransportMss
{
    public long LId { get; set; }

    public string TransportRefNo { get; set; } = null!;

    public string TransportName { get; set; } = null!;

    public int DeliveryType { get; set; }

    public string LocationFrom { get; set; } = null!;

    public string LocationTo { get; set; } = null!;

    public int TransType { get; set; }

    public DateOnly RequestDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
