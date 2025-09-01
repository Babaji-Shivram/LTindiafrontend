using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMailSendingTest
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int? JobId { get; set; }

    public int? LType { get; set; }

    public string? SEmailTo { get; set; }

    public string? SEmailCc { get; set; }

    public string? SBody { get; set; }

    public string? SSubject { get; set; }

    public DateTime? DtDate { get; set; }
}
