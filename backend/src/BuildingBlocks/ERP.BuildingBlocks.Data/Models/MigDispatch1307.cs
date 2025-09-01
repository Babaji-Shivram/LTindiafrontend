using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigDispatch1307
{
    public int? Lid { get; set; }

    public string? PersonName { get; set; }

    public string? CustomerName { get; set; }

    public string? CoverNote { get; set; }

    public string? CourierName { get; set; }

    public string? PodNo { get; set; }

    public DateTime? PodDt { get; set; }

    public DateTime? DeliveryDate { get; set; }

    public bool IsUpdate { get; set; }

    public int? UpdateId { get; set; }
}
