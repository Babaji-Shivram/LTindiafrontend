using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsCustomerBillM
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int? JobId { get; set; }

    public decimal? TotalFreight { get; set; }

    public decimal? TotalDetention { get; set; }

    public decimal? TotalEmpty { get; set; }

    public decimal? TotalWarai { get; set; }

    public int? FapostingUser { get; set; }

    public DateTime? FapostingDate { get; set; }

    public string? Fajbno { get; set; }

    public decimal? TotalBillAmount { get; set; }

    public bool? IsBillToBabaji { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
