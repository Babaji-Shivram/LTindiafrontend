using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdDorequest
{
    public int Lid { get; set; }

    public string? ResponseRefNo { get; set; }

    public int JobId { get; set; }

    public int? ModuleId { get; set; }

    public int? ShippingId { get; set; }

    public string? ShippingName { get; set; }

    public string? ShippingCode { get; set; }

    public string Blno { get; set; } = null!;

    public string CargoType { get; set; } = null!;

    public string StuffType { get; set; } = null!;

    public string LocationCode { get; set; } = null!;

    public bool IsFreeDays { get; set; }

    public DateTime? FreeDaysValidity { get; set; }

    public bool? IsDoext { get; set; }

    public bool? IsSeawayBl { get; set; }

    public bool? IsOdexPayment { get; set; }

    public bool? IsAdvanceBlsubmit { get; set; }

    public string? RunnerBoyName { get; set; }

    public string? RunnerBoyMobNo { get; set; }

    public string? HsscustomerName { get; set; }

    public string? FactoryAddress { get; set; }

    public string? FactoryPin { get; set; }

    public string? Remark { get; set; }

    public int LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
