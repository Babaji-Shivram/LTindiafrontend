using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrAirrateChart
{
    public int LId { get; set; }

    public string? Country { get; set; }

    public string? Pol { get; set; }

    public string? Pod { get; set; }

    public string? Mincharge { get; set; }

    public string? _45kg { get; set; }

    public string? _100kg { get; set; }

    public string? _300kg { get; set; }

    public string? _500kg { get; set; }

    public string? _1000kg { get; set; }

    public string? Fsccharge { get; set; }

    public string? Ssccharge { get; set; }

    public string? OtherCharge { get; set; }

    public string? Currency { get; set; }

    public string? Airline { get; set; }

    public string? Agent { get; set; }

    public string? Remark { get; set; }

    public DateTime? RateValidityDate { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
