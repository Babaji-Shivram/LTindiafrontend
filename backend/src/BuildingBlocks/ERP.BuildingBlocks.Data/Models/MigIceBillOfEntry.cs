using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigIceBillOfEntry
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public int Beno { get; set; }

    public DateTime Bedate { get; set; }

    public string? IceBedate { get; set; }

    public string? IceIecno { get; set; }

    public string? IceTotalValue { get; set; }

    public string? IceTyp { get; set; }

    public string? IceChano { get; set; }

    public string? IceFirstCheck { get; set; }

    public string? IcePriorBe { get; set; }

    public string? IceSec48 { get; set; }

    public string? IceAppGroup { get; set; }

    public string? IceTotalAssess { get; set; }

    public string? IceTotalPkgs { get; set; }

    public string? IceGrossWt { get; set; }

    public string? IceTotalDuty { get; set; }

    public string? IceFinePenalty { get; set; }

    public string? IceWbeno { get; set; }

    public string? IceAppraisement { get; set; }

    public string? IceCurrQueue { get; set; }

    public string? IceQueryRaised { get; set; }

    public string? IceQueryReply { get; set; }

    public string? IceReplyDate { get; set; }

    public string? IceReplyStatus { get; set; }

    public string? IceApprdate { get; set; }

    public string? IceAssessDate { get; set; }

    public string? IcePaymentDate { get; set; }

    public string? IceExamineDate { get; set; }

    public string? IceOocdate { get; set; }

    public string? IceChallanNo { get; set; }

    public string? IceDutyAmount { get; set; }

    public string? IceFineAmount { get; set; }

    public string? IceInterestAmount { get; set; }

    public string? IcePenalAmount { get; set; }

    public string? IceTotalDutyAmount { get; set; }

    public string? IceDutyPaid { get; set; }

    public string? IceModeOfPayment { get; set; }

    public bool? IsActive { get; set; }

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
