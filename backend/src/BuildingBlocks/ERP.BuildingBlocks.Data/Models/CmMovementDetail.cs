using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CmMovementDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public bool IsProcessed { get; set; }

    public int? ProcessedBy { get; set; }

    public DateTime? ProcessedOn { get; set; }

    public string? Remark { get; set; }

    public DateOnly? EmptyContReturnDate { get; set; }

    public DateOnly? MovementCompDate { get; set; }

    public DateOnly? ShippingLineDate { get; set; }

    public DateOnly? ConfirmedByLineDate { get; set; }

    public int? Cfsid { get; set; }

    public int? NominatedCfsid { get; set; }

    public DateOnly? ContCfsreceivedDate { get; set; }

    public bool IsReceived { get; set; }

    public int? CfscontainerCount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
