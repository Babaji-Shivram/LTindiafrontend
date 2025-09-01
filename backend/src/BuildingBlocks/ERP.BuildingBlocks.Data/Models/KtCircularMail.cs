using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KtCircularMail
{
    public int Lid { get; set; }

    public string? CircularNo { get; set; }

    public int? CircularType { get; set; }

    public int? CompanyType { get; set; }

    public string? CustomerMailId { get; set; }

    public string MailSubject { get; set; } = null!;

    public string? MsgBody { get; set; }

    public bool MailSent { get; set; }

    public DateTime? MailSentDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
