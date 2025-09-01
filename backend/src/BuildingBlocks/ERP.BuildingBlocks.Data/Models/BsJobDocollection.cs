using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDocollection
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateOnly? ConsolDoDate { get; set; }

    public DateOnly? FinalDodate { get; set; }

    public int? FreeDays { get; set; }

    public DateOnly? EmptyValidityDate { get; set; }

    public string? EmptyYardName { get; set; }

    public int? DetentionAmountDeleted { get; set; }

    public decimal? DoamountDeleted { get; set; }

    public string? BlankChequeNo { get; set; }

    public DateOnly? BlankChequeDate { get; set; }

    public bool? BondSubmitted { get; set; }

    public int? SecurityDeposit { get; set; }

    public string? SecurityReceiptPath { get; set; }

    public int? PaymentType { get; set; }

    public int? Dobranch { get; set; }

    public int? DostageId { get; set; }

    public string? PickupPerson { get; set; }

    public string? Remark { get; set; }

    public string? AppConsolePath { get; set; }

    public string? AppFinalPath { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
