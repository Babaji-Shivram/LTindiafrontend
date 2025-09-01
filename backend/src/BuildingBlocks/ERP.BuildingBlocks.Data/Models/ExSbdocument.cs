using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExSbdocument
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? Sbno { get; set; }

    public DateTime? Sbdate { get; set; }

    public int DocumentId { get; set; }

    public string? DirPath { get; set; }

    public string? FileName { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
