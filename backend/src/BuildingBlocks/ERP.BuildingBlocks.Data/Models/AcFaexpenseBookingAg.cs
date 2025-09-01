using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcFaexpenseBookingAg
{
    public int Lid { get; set; }

    public int BookingId { get; set; }

    public string? ChargeName { get; set; }

    public string? ChargeCode { get; set; }

    public decimal? AgencyAmount { get; set; }

    public bool? ChargeToParty { get; set; }

    public int? ApprovedBy { get; set; }

    public string? ApprovalFilePath { get; set; }

    public decimal? PartyChargeAmount { get; set; }

    public int? ServiceId { get; set; }

    public string? ServiceRemark { get; set; }

    public DateOnly? SubmissiontToAccountsDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
