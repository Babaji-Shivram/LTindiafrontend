using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdInvoiceResponse
{
    public int Lid { get; set; }

    public int RequestId { get; set; }

    public string? BnfCode { get; set; }

    public string? LocationCode { get; set; }

    public string? BookingLineCode { get; set; }

    public string? TypOfCargo { get; set; }

    public string? IdTp { get; set; }

    public string? BlNo { get; set; }

    public string? InvNo { get; set; }

    public decimal? TotalPymtAmt { get; set; }

    public string? InvCategory { get; set; }

    public string? InvTp { get; set; }

    public DateTime? InvDt { get; set; }

    public string? BillToParty { get; set; }

    public string? GstNo { get; set; }

    public string? PartialPymt { get; set; }

    public string? IsDorevalidation { get; set; }

    public decimal? DoRevalidationCharges { get; set; }

    public string? IsTdsDeduction { get; set; }

    public string? JobNo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
