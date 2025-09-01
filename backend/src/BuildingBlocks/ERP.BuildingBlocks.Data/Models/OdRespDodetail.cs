using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdRespDodetail
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public int ModuleId { get; set; }

    public string? BnfCode { get; set; }

    public string? DoReqStatus { get; set; }

    public string? BlNo { get; set; }

    public string? LocationCode { get; set; }

    public string? Remarks { get; set; }

    public string? Status { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
