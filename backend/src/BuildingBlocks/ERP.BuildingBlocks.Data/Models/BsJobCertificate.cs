using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobCertificate
{
    public long LId { get; set; }

    public long JobId { get; set; }

    public string? CertType { get; set; }

    public string? CertNumber { get; set; }

    public DateOnly? CertDate { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
