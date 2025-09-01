using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryMailsDetail
{
    public int LId { get; set; }

    public int? EnqId { get; set; }

    public string? EnqrefNo { get; set; }

    public string? GraphMessageKey { get; set; }

    public string? GraphConversationKey { get; set; }

    public string? MailSubject { get; set; }

    public string? MailBody { get; set; }

    public string? SenderAddress { get; set; }

    public string? RecipientTo { get; set; }

    public string? RecipientCc { get; set; }

    public DateTime? MailSentDate { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
