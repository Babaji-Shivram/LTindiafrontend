using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerCircularShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string? CircularNo { get; set; }

    public int? CompanyType { get; set; }

    public bool? AllContact { get; set; }

    public string? CustomerMailId { get; set; }

    public string MailSubject { get; set; } = null!;

    public string? MsgBody { get; set; }

    public string? DocPath { get; set; }

    public string? DocPath2 { get; set; }

    public bool MailSent { get; set; }

    public DateTime? MailSentDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
